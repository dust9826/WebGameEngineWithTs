/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import express from 'express';

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
const __dirname = '/workspaces/WebGameEngineWithTs';

app.use('/scripts', express.static(__dirname + '/Engine/scripts'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/Engine/index.html');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);