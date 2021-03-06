// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as fs from 'fs';
import {promisify} from 'util';

export function base64toBuffer(data: string): Uint8Array {
  return Buffer.from(data, 'base64');
}

export function bufferToBase64(buffer: Uint8Array): string {
  return Buffer.from(buffer).toString('base64');
}

export async function readJsonFile(file: string) {
  const content = await readFile(file);
  return JSON.parse(content.toString());
}

async function readFile(file: string) {
  if (typeof fetch === 'undefined') {
    // node
    return promisify(fs.readFile)(file);
  } else {
    // browser
    const response = await fetch(file);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  }
}
