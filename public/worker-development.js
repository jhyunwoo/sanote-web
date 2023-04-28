/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./worker/index.js":
/*!*************************!*\
  !*** ./worker/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nself.__WB_DISABLE_DEV_LOGS = true;\nself.addEventListener(\"push\", function(event) {\n    const data = JSON.parse(event.data?.text() ?? '{ title: \"\" }');\n    event.waitUntil(self.registration.showNotification(data.title, {\n        body: data.message,\n        icon: \"/icons/android-chrome-192x192.png\"\n    }));\n});\nself.addEventListener(\"notificationclick\", function(event) {\n    event.notification.close();\n    event.waitUntil(self.clients.matchAll({\n        type: \"window\",\n        includeUncontrolled: true\n    }).then(function(clientList) {\n        if (clientList.length > 0) {\n            let client = clientList[0];\n            for(let i = 0; i < clientList.length; i++){\n                if (clientList[i].focused) {\n                    client = clientList[i];\n                }\n            }\n            return client.focus();\n        }\n        return self.clients.openWindow(\"/\");\n    }));\n});\n\n\n\n//# sourceURL=webpack://sanote-web/./worker/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./worker/index.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;