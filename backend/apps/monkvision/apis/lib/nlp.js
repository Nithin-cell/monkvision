/**
 * NLP Search Preview layout page for Monkvision
 *  
 * (C) 2021 TekMonks. All rights reserved.
 * License: See enclosed license.txt file.
 */

// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-node';
// import * as use from '@tensorflow-models/universal-sentence-encoder';

const tf = require("@tensorflow/tfjs");
const use = require("@tensorflow-models/universal-sentence-encoder");
require('@tensorflow/tfjs-node');

// Train Model (JSON)
const metricIntents = require(`/home/sridharan/dlt-workspace/rohit-monkvision/monkvision/backend/apps/monkvision/conf/models/metric_intents.json`)
const durationIntents = require(`/home/sridharan/dlt-workspace/rohit-monkvision/monkvision/backend/apps/monkvision/conf/models/duration_intents.json`)
const resourceIntents = require(`/home/sridharan/dlt-workspace/rohit-monkvision/monkvision/backend/apps/monkvision/conf/models/resource_intents.json`)

// import metricIntents from '../../conf/models/metric-intents-model.json';
// import durationIntents from '.../../conf/models/duration-training.json';
// import resourceIntents from '.../../conf/models/resource-intents-model.json';

// const _init = async _ => {
//     await $$.require(`${APP_CONSTANTS.APP_PATH}/js/3p/tf.min.js`)
//     await $$.require(`${APP_CONSTANTS.APP_PATH}/js/3p/tf-universal-sentence-encode.js`)
// }

exports.init = async () => {
    // await _init();

    // const metricIntents = await $$.requireJSON(`${APP_CONSTANTS.APP_PATH}/models/metric_intents.json`);
    // const durationIntents = await $$.requireJSON(`${APP_CONSTANTS.APP_PATH}/models/duration_intents.json`);
    // const resourceIntents = await $$.requireJSON(`${APP_CONSTANTS.APP_PATH}/models/resource_intents.json`);

    MODELS["encoder"] = use.load();

    _createModelAndItsLayer("metrics", 3, 3, 3);
    _createModelAndItsLayer("durations", 3, 7, 7);
    _createModelAndItsLayer("resources", 3, 4, 4);

    _setInputTensor(metricIntents, durationIntents, resourceIntents);

    _trainModel("metrics", metricIntents, 200);
    _trainModel("durations", durationIntents, 250);
    _trainModel("resources", resourceIntents, 200);

}

function _createModelAndItsLayer(modelName, layersCount, inputShape, units) {
    MODELS[modelName] = tf.sequential();

    for (let layer = 1; layer <= layersCount; layer++) {
        MODELS[modelName].add(tf.layers.dense({
            inputShape: [ layer == 1 ? 512 : inputShape ],
            activation: 'sigmoid',
            units: units,
        }));
    }

    MODELS[modelName].compile({
        loss: 'meanSquaredError',
        optimizer: tf.train.adam(.06), // This is a standard compile config
    });
}

// Global declarations
const MODELS = {}, TENSORS = {}, dt = {},
        METRICS = {0: "cpu", 1: "ram", 2: "disk" }, 
        DURATIONS = {0: "hours", 1: "minutes", 2: "seconds", 3: "days", 4: "weeks", 5: "months", 6: "years" }, 
        RESOURCES = {0: "primary_prod", 1: "secondary_prod", 2: "staging", 3: "dev" };

// @tensorflow-models/universal-sentence-encoder
// Convert sentence to tensor -> string to vector
const encodeData = data => {
    const sentences = data.map(comment => comment.text.toLowerCase());
    const trainingData = MODELS["encoder"].then(model => {
            return model.embed(sentences)
                .then(embeddings => {
                    return embeddings;
                });
        })
        .catch(err => console.error('Fit Error:', err));

    return trainingData
};

function _setInputTensor(metricIntents, durationIntents, resourceIntents){

    // metrics - cpu, ram, disk
    TENSORS["metrics"] = tf.tensor2d(metricIntents.map(metric => [
        metric.intent === 'cpu' ? 1 : 0,
        metric.intent === 'ram' ? 1 : 0,
        metric.intent === 'disk' ? 1 : 0
    ]));

    // duration - hours, minutes, seconds, days, weeks, months, years
    TENSORS["durations"] = tf.tensor2d(durationIntents.map(duration => [
        duration.intent === 'hours' ? 1 : 0,
        duration.intent === 'minutes' ? 1 : 0,
        duration.intent === 'seconds' ? 1 : 0,
        duration.intent === 'days' ? 1 : 0,
        duration.intent === 'weeks' ? 1 : 0,
        duration.intent === 'months' ? 1 : 0,
        duration.intent === 'years' ? 1 : 0
    ]));

    // resources - primary_prod, secondary_prod, staging, dev
    TENSORS["resources"] = tf.tensor2d(resourceIntents.map(resource => [
        resource.intent === 'primary_prod' ? 1 : 0,
        resource.intent === 'secondary_prod' ? 1 : 0,
        resource.intent === 'staging' ? 1 : 0,
        resource.intent === 'dev' ? 1 : 0
    ]));
}

async function _trainModel(modelName, intents, iteration = 200) {
    const trainingData = encodeData(intents).then((data) => {return data});
    await MODELS[modelName].fit(await trainingData, TENSORS[modelName], { epochs: iteration });
}

exports.predictOutput = async (query) => {
    const sentence = query["text"];
    const merticsIntent = await getMetricsIntent(sentence);
    const durationIntent = await getDurationIntent(sentence);
    const resourceIntent = await getResourceIntent(sentence);

    const output = { 
        metric: merticsIntent, 
        duration: durationIntent.weight,
        duration_unit: durationIntent.unit,
        resource_name: resourceIntent
    }

    console.log(output);
    return output;
}

const numericWords = {
    units: {
        'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 
        'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15, 'sixteen': 16, 'seventeen': 17, 
        'eighteen': 18, 'nineteen': 19, 'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50, 'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90
    },
    magnitudes: {
        'hundred': 100, 'thousand': 1000, 'million': 1000000, 'billion': 1000000000, 'trillion': 1000000000000
    },
    commonWords: ["and"]
}

const durationUnits = {
    hours: ["hours", "hrs", "hr", "hour"], minutes: ["minutes", "mins", "min"], seconds: ["seconds", "second"],
    days: ["days", "day"], weeks: ["weeks", "week"], months: ["months", "month"], years: ["years", "year", "yrs"]
}

function wordsToNumbers(sentence) {
    const words = sentence.toString().split(/[\s-]+/);
    const position = { base: 0, digits: 0 }; 
    words.forEach((word)=>{ calculateNumeral(word, position) });
    return position;
}

function calculateNumeral(word, position) {
    let value = numericWords.units[word];
    if (value != null) {
        if (!position.startWord) position.startWord = word;
        position.digits += value;
    }
    else if (numericWords.commonWords.includes(word)) return;
    else {
        value = numericWords.magnitudes[word];
        if (value != null) {
            position.base += position.digits * value
            position.digits = 0;
        }
    }
}

const getdurationUnit = (query, durationIntent) => durationUnits[durationIntent].filter(unit => intentExists(query, unit)); 

const intentExists = (query, unit) => query.split(" ").includes(unit);

function getDurationWeight(query, durationIntent) {
    const durationUnit = getdurationUnit(query, durationIntent);
    const queryArr = query.substring(0, query.indexOf(durationUnit[0])).trim().split(" ");
    const extractWord = queryArr[queryArr.length-1];
    if (isNaN(extractWord)){
        return wordsToNumbers(queryArr.join(" "));
    }
    else{
        return Number(extractWord);
    }
}

async function getMetricsIntent(query, metrics=[]) {
    const testingData = encodeData([{text: query}]).then((data) => {return data});
    const metricPredictions = await MODELS["metrics"].predict(await testingData).array();
    const matchedMetric = METRICS[metricPredictions[0].indexOf(Math.max(...metricPredictions[0]))]
    if (!intentExists(query, matchedMetric)) return metrics;
    query = query.replace(matchedMetric, "");
    metrics.push(matchedMetric);
    return await getMetricsIntent(query, metrics);
}

async function getDurationIntent(query, durations={}) {
    const testingData = encodeData([{text: query}]).then((data) => {return data});
    const durationPredictions = await MODELS["durations"].predict(await testingData).array();
    const matchedDuration = DURATIONS[durationPredictions[0].indexOf(Math.max(...durationPredictions[0]))]
    const strMatch = getdurationUnit(query, matchedDuration);
    
    if (strMatch.length == 0 ) {
        if (Object.keys(durations).length > 1){
            return calculateDurationInMinutes(durations);
        }
        durations.unit = Object.keys(durations)[0];
        durations.weight = Object.values(durations)[0];
        return calculateDurationInMinutes(durations);
    }

    const durationWeight = getDurationWeight(query, matchedDuration);
    if (durationWeight.startWord){
        const substr = query.substring(query.indexOf(durationWeight.startWord), query.indexOf(strMatch[0]));
        query = query.replace(substr + strMatch[0], "")
        durations[matchedDuration] = durationWeight.base + durationWeight.digits;
    }else{
        query = query.replace(durationWeight +" "+ strMatch[0], "");
        durations[matchedDuration] = durationWeight;
    }
    
    return await getDurationIntent(query, durations);
}

function calculateDurationInMinutes(durations) {
    durations.weight = 0;
    durations.unit = "minutes";
    
    if (durations.hours) durations.weight += durations.hours * 60;
    if (durations.minutes) durations.weight += durations.minutes;
    if (durations.seconds) durations.weight += (durations.seconds / 60);
    if (durations.days) durations.weight += (durations.days * 1440);
    if (durations.weeks) durations.weight += (durations.weeks * 10080);
    if (durations.months) durations.weight += (durations.months * 43800);
    if (durations.years) durations.weight += (durations.years * 525600);

    return durations;
}

async function getResourceIntent(query, resources=[]) {
    const testingData = encodeData([{text: query}]).then((data) => {return data});
    const resourcePredictions = await MODELS["resources"].predict(await testingData).array();
    const matchedResource = RESOURCES[resourcePredictions[0].indexOf(Math.max(...resourcePredictions[0]))];

    return matchedResource;
    // if (!query.includes(matchedResource)) return resources;
    // query = query.replace(matchedResource, "");
    // resources.push(matchedResource);
    // return await getResourceIntent(query, resources);
}

exports.model = MODELS;