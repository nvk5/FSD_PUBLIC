// // Give the service worker access to Firebase Messaging.
// // Note that you can only use Firebase Messaging here. Other Firebase libraries
// // are not available in the service worker.
// importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');
//
// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// // firebase.initializeApp({
// // 	apiKey: 'AIzaSyA5Q_b0li0Zd28OSXyvfJHbtAcN8bX-sNM',
// // 	authDomain: 'testtest-99b1a.firebaseapp.com',
// // 	projectId: 'testtest-99b1a',
// // 	storageBucket: 'testtest-99b1a.appspot.com',
// // 	messagingSenderId: '32638409016',
// // 	appId: '1:32638409016:web:e0d941c92f4c6c038909cd',
// // 	measurementId: 'G-KR5M1MXNBE',
// // });
// firebase.initializeApp({
// 	apiKey: 'AIzaSyCnQ33VKzvMmUAPMk6E39gRI7io-SWZ564',
// 	authDomain: 'test-project-6c6c8.firebaseapp.com',
// 	projectId: 'test-project-6c6c8',
// 	storageBucket: 'test-project-6c6c8.appspot.com',
// 	messagingSenderId: '1085764841080',
// 	appId: '1:1085764841080:web:fd3de75b1790b5f506078d',
// 	measurementId: 'G-CG7VWBK3R9',
// });
//
// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = firebase.messaging();
//
// // Обработка свернутого или выкл. приложения
//
// messaging.onBackgroundMessage((payload) => {
// 	console.log(
// 		'[firebase-messaging-sw.js] Received background message ',
// 		payload,
// 	);
// 	// Customize notification here
// 	const notificationTitle = payload.notification.title;
// 	const notificationOptions = {
// 		body: payload.notification.body,
// 		icon: 'https://em-content.zobj.net/thumbs/120/apple/354/rolling-on-the-floor-laughing_1f923.png',
// 	};
//
// 	self.registration.showNotification(notificationTitle, notificationOptions);
// });

import { getApi } from '@/shared/api';

importScripts('https://www.gstatic.com/firebasejs/3.7.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.7.2/firebase-messaging.js');

firebase.initializeApp({
	apiKey: 'AIzaSyCnQ33VKzvMmUAPMk6E39gRI7io-SWZ564',
	authDomain: 'test-project-6c6c8.firebaseapp.com',
	projectId: 'test-project-6c6c8',
	storageBucket: 'test-project-6c6c8.appspot.com',
	messagingSenderId: '1085764841080',
	appId: '1:1085764841080:web:fd3de75b1790b5f506078d',
	measurementId: 'G-CG7VWBK3R9',
});

const messaging = firebase.messaging();

// Customize notification handler
messaging.setBackgroundMessageHandler((payload) => {
	console.log('Handling background message', payload);

	// Copy data object to get parameters in the click handler
	payload.data.data = JSON.parse(JSON.stringify(payload.data));

	return self.registration.showNotification(payload.data.title, payload.data);
});

self.addEventListener('notificationclick', (event) => {
	// event.respondWith(fetch('http://kserver3.beta/incognito/api/v2/login'));
	// fetch('http://kserver3.beta/incognito/api/v2/login');
	// console.log('123');

	const target = event.notification.data.click_action || '/';
	event.notification.close();

	// event.respondWith(fetch('http://kserver3.beta/incognito/api/v2/login'));
	// fetch('http://kserver3.beta/incognito/api/v2/login');
	// console.log('123');

	event.waitUntil(
		fetch('http://kserver3.prod/incognito/api/v2/login', { method: 'POST' }) // отправка POST-запроса на сервер
			.then((response) => response.json())
			.then((data) => {
				console.log('Уведомление закрыто и данные отправлены на сервер:', data);
			})
			.catch((error) => {
				console.error('Ошибка при отправке данных на сервер:', error);
			}),
	);
	// This looks to see if the current is already open and focuses if it is
	// event.waitUntil(clients.matchAll({
	// 	type: 'window',
	// 	includeUncontrolled: true,
	// }).then((clientList) => {
	// 	event.respondWith(fetch('http://kserver3.beta/incognito/api/v2/login'));
	// 	// clientList always is empty?!
	// 	for (let i = 0; i < clientList.length; i++) {
	// 		const client = clientList[i];
	// 		if (client.url === target && 'focus' in client) {
	// 			return client.focus();
	// 		}
	// 	}
	// 	event.respondWith(fetch('http://kserver3.beta/incognito/api/v2/login'));
	// 	fetch('http://kserver3.beta/incognito/api/v2/login');
	// 	console.log('123');
	//
	// 	return clients.openWindow(target);
	// }));
});
