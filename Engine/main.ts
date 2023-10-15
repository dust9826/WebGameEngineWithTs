import { Core } from './core.js'
import { Logger } from './log.js';
import { Renderer } from './renderer.js';

Core.instance.init('#screen');

Logger.log('test log');

Renderer.log('log test');