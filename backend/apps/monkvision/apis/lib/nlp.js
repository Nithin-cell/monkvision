/**
 * NLP Search for Monkvision
 *  
 * (C) 2021 TekMonks. All rights reserved.
 * License: See enclosed license.txt file.
 */

const fs = require("fs");
const Mustache = require("mustache");
const utils = require(`${APP_CONSTANTS.LIB_DIR}/nlp/utils.js`);
const tf = require("@tensorflow/tfjs");
const use = require("@tensorflow-models/universal-sentence-encoder");
require('@tensorflow/tfjs-node');

// Load the englishModel
const englishModel = require(`${APP_CONSTANTS.CONF_DIR}/englishModel.json`);

// Global declarations
const MODELS = {}, TENSORS = {}, INTENTS = {}, METRICS = Object.assign({}, englishModel.metrics), DURATIONS = Object.assign({}, englishModel.durations), RESOURCES = Object.assign({}, englishModel.resources);

// Train Model (JSON)
INTENTS["metrics"] = JSON.parse(Mustache.render(fs.readFileSync(`${APP_CONSTANTS.CONF_DIR}/models/metric_intents.json`,"utf8"), englishModel));
INTENTS["durations"] = JSON.parse(Mustache.render(fs.readFileSync(`${APP_CONSTANTS.CONF_DIR}/models/duration_intents.json`,"utf8"), englishModel));
INTENTS["resources"] = JSON.parse(Mustache.render(fs.readFileSync(`${APP_CONSTANTS.CONF_DIR}/models/resource_intents.json`,"utf8"), englishModel));

exports.init = async () => {
    MODELS["encoder"] = use.load();
    _setInputTensor();      // Set input tensors for all the intents

    _createModelAndItsLayer("metrics", 3, englishModel.metrics.length, 200, _trainModel);
    _createModelAndItsLayer("durations", 3, englishModel.durations.length, 250, _trainModel);
    _createModelAndItsLayer("resources", 3, englishModel.resources.length, 200, _trainModel);    
}

function _createModelAndItsLayer(modelName, layersCount, inputShape, iterationCount, callback) {
    MODELS[modelName] = tf.sequential();
    for (let layer = 1; layer <= layersCount; layer++) {
        MODELS[modelName].add(tf.layers.dense({
            inputShape: [layer == 1 ? 512 : inputShape],
            activation: 'sigmoid',
            units: inputShape,
        }));
    }

    MODELS[modelName].compile({
        loss: 'meanSquaredError',
        optimizer: tf.train.adam(.06), // This is a standard compile config
    });
    if (callback) callback(modelName, iterationCount);
}

// @tensorflow-models/universal-sentence-encoder
// Convert sentence to tensor -> string to vector
const encodeData = data => {
    const sentences = data.map(comment => comment.text.toLowerCase());
    const trainingData = MODELS["encoder"].then(model => {
            return model.embed(sentences)
                .then(embeddings => { return embeddings; });
            })
            .catch(err => console.error('Fit Error:', err));
    return trainingData
};

function _setInputTensor(){
    // metrics - cpu, ram, disk
    TENSORS["metrics"] = tf.tensor2d(INTENTS["metrics"].map(metric => englishModel.metrics.map(intent => metric.intent === intent ? 1 : 0)));

    // duration - hours, minutes, seconds, days, weeks, months, years
    TENSORS["durations"] = tf.tensor2d(INTENTS["durations"].map(duration => englishModel.durations.map(intent => duration.intent === intent ? 1 : 0)));

    // resources - primary_prod, secondary_prod, staging, dev
    TENSORS["resources"] = tf.tensor2d(INTENTS["resources"].map(resource => englishModel.resources.map(intent => resource.intent === intent ? 1 : 0)));
}

async function _trainModel(modelName, iteration = 200) {
    const trainingData = encodeData(INTENTS[modelName]).then((data) => {return data});
    await MODELS[modelName].fit(await trainingData, TENSORS[modelName], { epochs: iteration });
}

exports.predictOutput = async (query) => {
    const sentence = query["text"];
    const merticsIntent = await getMetricsIntent(sentence);
    const durationIntent = await getDurationIntent(sentence);
    const resourceIntent = utils.resourceExists ? await getResourceIntent(sentence) : "null";

    const output = { 
        metric: merticsIntent, duration: durationIntent.weight,
        durationUnit: durationIntent.unit, resourceName: resourceIntent
    }
    return output;
}

async function getMetricsIntent(query, metrics=[]) {
    const trainingData = encodeData([{text: query}]).then((data) => {return data});
    const metricPredictions = await MODELS["metrics"].predict(await trainingData).array();
    const maxMetricPredict = METRICS[metricPredictions[0].indexOf(Math.max(...metricPredictions[0]))]
    if (!utils.intentExists(query, maxMetricPredict)) return metrics;
    query = query.replace(maxMetricPredict, "");
    metrics.push(maxMetricPredict);
    return await getMetricsIntent(query, metrics);
}

async function getDurationIntent(query, durations={}) {
    const trainingData = encodeData([{text: query}]).then((data) => {return data});
    const durationPredictions = await MODELS["durations"].predict(await trainingData).array();
    const maxDurationPredict = DURATIONS[durationPredictions[0].indexOf(Math.max(...durationPredictions[0]))]
    const strMatch = utils.getDurationUnit(query, maxDurationPredict);

    if (strMatch.length == 0 ) {
        if (Object.keys(durations).length > 1) return utils.calculateDurationInMinutes(durations);
        durations.unit = Object.keys(durations)[0];
        durations.weight = Object.values(durations)[0];
        return utils.calculateDurationInMinutes(durations);
    }
    const durationWeight = utils.getDurationWeight(query, maxDurationPredict);
    if (durationWeight.startWord){
        const substr = query.substring(query.indexOf(durationWeight.startWord), query.indexOf(strMatch[0]));
        query = query.replace(substr + strMatch[0], "")
        durations[maxDurationPredict] = durationWeight.base + durationWeight.digits;
    }else{
        query = query.replace(durationWeight +" "+ strMatch[0], "");
        durations[maxDurationPredict] = durationWeight;
    }
    return await getDurationIntent(query, durations);
}

async function getResourceIntent(query) {
    const trainingData = encodeData([{text: query}]).then((data) => {return data});
    const resourcePredictions = await MODELS["resources"].predict(await trainingData).array();
    const maxResourcePredict = RESOURCES[resourcePredictions[0].indexOf(Math.max(...resourcePredictions[0]))];
    return maxResourcePredict;
}

exports.model = MODELS;