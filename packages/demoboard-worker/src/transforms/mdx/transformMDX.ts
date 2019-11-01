/*
 * Copyright 2019 Seven Stripes Kabushiki Kaisha
 *
 * This source code is licensed under the Apache License, Version 2.0, found
 * in the LICENSE file in the root directory of this source tree.
 */

import rehypePrism from './rehype-prism'

const emoji = require('remark-emoji')
const images = require('remark-images')
const textr = require('remark-textr')
const slug = require('remark-slug')
const typographicBase = require('typographic-base')
const mdx = require('@mdx-js/mdx')

export function transformMDX(source: string): string {
  return mdx
    .sync(source, {
      remarkPlugins: [
        slug,
        images,
        emoji,
        [textr, { plugins: [typographicBase] }],
      ],
      rehypePlugins: [rehypePrism],
    })
    .trim()
}