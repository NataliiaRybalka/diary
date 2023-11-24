"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePushTokens = void 0;
const expo_server_sdk_1 = require("expo-server-sdk");
const pushConstants_1 = __importDefault(require("./pushConstants"));
const expo = new expo_server_sdk_1.Expo();
const handlePushTokens = (pushData) => {
    const { type, taskData = null, token, language } = pushData;
    const notifications = [];
    if (!expo_server_sdk_1.Expo.isExpoPushToken(token)) {
        console.log(`Push token ${token} is not a valid Expo push token`);
        return;
    }
    // @ts-ignore
    const messageData = pushConstants_1.default[language][type];
    const body = taskData ? messageData.body(taskData) : messageData.body;
    notifications.push({
        to: token,
        sound: 'default',
        title: messageData.title,
        body,
        data: { body }
    });
    const chunks = expo.chunkPushNotifications(notifications);
    (async () => {
        for (let chunk of chunks) {
            try {
                const receipts = await expo.sendPushNotificationsAsync(chunk);
                if (receipts[0].status !== 'ok')
                    throw new Error(JSON.stringify(receipts));
            }
            catch (error) {
                console.log(error);
            }
        }
    })();
};
exports.handlePushTokens = handlePushTokens;
