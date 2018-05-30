'use strict';
//reflect-metadata shim is required, requirement of routing-controllers module.
import 'reflect-metadata';
import { Application } from './middleware/config/Application';

export default new Application();