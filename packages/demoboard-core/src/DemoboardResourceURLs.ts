/*
 * Copyright 2019 Seven Stripes Kabushiki Kaisha
 *
 * This source code is licensed under the Apache License, Version 2.0, found
 * in the LICENSE file in the root directory of this source tree.
 */
/* eslint-disable import/no-webpack-loader-syntax */

import { version as runtimeVersion } from '@frontarm/demoboard-runtime/package.json'
import { version as workerVersion } from '@frontarm/demoboard-worker/package.json'

export interface DemoboardResourceURLs {
  container: string
  runtime: string
  worker: string
  workerTransformBase?: string
  workerTransformOverrides?: { [name: string]: string }
}

const isProduction = (process.env.NODE_ENV as any) === 'production'
const jsExtension = isProduction ? '.min.js' : '.js'
export const defaultResourceURLs: DemoboardResourceURLs = {
  runtime:
    process.env.REACT_APP_DEMOBOARD_RUNTIME_URL ||
    (isProduction
      ? `https://unpkg.com/@frontarm/demoboard-runtime@${runtimeVersion}/dist/demoboard-runtime${jsExtension}`
      : require('!file-loader!@frontarm/demoboard-runtime/dist/demoboard-runtime.js')),
  container:
    process.env.REACT_APP_DEMOBOARD_CONTAINER_URL ||
    (isProduction
      ? `https://unpkg.com/@frontarm/demoboard-container@{runtimeVersion}/dist/container.html`
      : require('!file-loader!@frontarm/demoboard-runtime/dist/container.html')),
  worker:
    process.env.REACT_APP_DEMOBOARD_WORKER_BASE_URL ||
    (isProduction
      ? `https://unpkg.com/@frontarm/demoboard-worker@${workerVersion}/dist/umd/index.js`
      : require('!file-loader!@frontarm/demoboard-worker/dist/umd/index.js')),
}
if (isProduction) {
  defaultResourceURLs.workerTransformBase = `https://unpkg.com/@frontarm/demoboard-worker@${workerVersion}/dist/umd/transforms/`
} else {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  defaultResourceURLs.workerTransformOverrides = {
    babel:
      origin +
      require('!file-loader!@frontarm/demoboard-worker/dist/umd/transforms/babel.js'),
    css:
      origin +
      require('!file-loader!@frontarm/demoboard-worker/dist/umd/transforms/css.js'),
    cssModule:
      origin +
      require('!file-loader!@frontarm/demoboard-worker/dist/umd/transforms/cssModule.js'),
    mdx:
      origin +
      require('!file-loader!@frontarm/demoboard-worker/dist/umd/transforms/mdx.js'),
  }
}
