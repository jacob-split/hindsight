# Changelog

## 0.1.0 (2025-12-23)

Full Changelog: [v0.0.1...v0.1.0](https://github.com/jacob-split/hindsight/compare/v0.0.1...v0.1.0)

### Features

* add hindsight-embed and native agentic skill ([#64](https://github.com/jacob-split/hindsight/issues/64)) ([da44a5e](https://github.com/jacob-split/hindsight/commit/da44a5e83967899152559863868ded32bd4c16f7))
* add local mcp server ([#32](https://github.com/jacob-split/hindsight/issues/32)) ([7dd6853](https://github.com/jacob-split/hindsight/commit/7dd68538bb1f5cbb07c72805d4f52373cf502c24))
* add optional graph retriever MPFP ([#26](https://github.com/jacob-split/hindsight/issues/26)) ([7445cef](https://github.com/jacob-split/hindsight/commit/7445cef7b701ac887a2c5e2e92cdae4eef8ac860))
* extensions ([#54](https://github.com/jacob-split/hindsight/issues/54)) ([2a0c490](https://github.com/jacob-split/hindsight/commit/2a0c490c9ed618bf2064aa5f1bdfe21fb58cccda))
* refactor hindsight-embed architecture ([#66](https://github.com/jacob-split/hindsight/issues/66)) ([e6511e7](https://github.com/jacob-split/hindsight/commit/e6511e7d77a95d847f7386c7f2ca4a44abc81331))
* simplify mcp installation + ui standalone ([#41](https://github.com/jacob-split/hindsight/issues/41)) ([1c6acc3](https://github.com/jacob-split/hindsight/commit/1c6acc3ba0a8a2e2d587996f135d6dd4b59d7fe5))
* support for gemini-3-pro and gpt-5.2 ([#30](https://github.com/jacob-split/hindsight/issues/30)) ([bb1f9cb](https://github.com/jacob-split/hindsight/commit/bb1f9cb221171a417055408ad31216b908ff423e))


### Bug Fixes

* add DOM.Iterable lib to resolve URLSearchParams.entries() type error ([#27](https://github.com/jacob-split/hindsight/issues/27)) ([160c558](https://github.com/jacob-split/hindsight/commit/160c5581ec8acfb6928fb27f25487057645f48ea))
* add procps to Docker image and smoke test to release workflow ([#45](https://github.com/jacob-split/hindsight/issues/45)) ([ae80876](https://github.com/jacob-split/hindsight/commit/ae808766718b5d6deec705f0b9bb0e0ff79bc441))
* bank list response with no name banks ([04f01ab](https://github.com/jacob-split/hindsight/commit/04f01ab9abe86787aa75e0d5266e3314faa364cf))
* bank selector race condition when switching banks ([#38](https://github.com/jacob-split/hindsight/issues/38)) ([#39](https://github.com/jacob-split/hindsight/issues/39)) ([e468a4e](https://github.com/jacob-split/hindsight/commit/e468a4e19ffb04e596facfdb8e299fb2ab342f86))
* ci and ui build ([#9](https://github.com/jacob-split/hindsight/issues/9)) ([050a3d2](https://github.com/jacob-split/hindsight/commit/050a3d2743484de06ef840d4a7604544c80512b5))
* ci and ui improvements ([#8](https://github.com/jacob-split/hindsight/issues/8)) ([e142435](https://github.com/jacob-split/hindsight/commit/e1424357c4580170e3ce66d72518aa135883ca1f))
* doc build and lint files ([#34](https://github.com/jacob-split/hindsight/issues/34)) ([9394cf9](https://github.com/jacob-split/hindsight/commit/9394cf92f232d23f9f0fd5757f936cb5f9c8f666))
* docker image and control plane standalone build ([2948cb6](https://github.com/jacob-split/hindsight/commit/2948cb62d222c2ff445f3f4080184e4d053c87d0))
* docker image build and startup ([#46](https://github.com/jacob-split/hindsight/issues/46)) ([b52eb90](https://github.com/jacob-split/hindsight/commit/b52eb905ad5159333fd0e3b938692c5e356e147c))
* make sure openai provider works + docs updates ([#23](https://github.com/jacob-split/hindsight/issues/23)) ([f42476b](https://github.com/jacob-split/hindsight/commit/f42476bf947b56fb7464170ed3c12ce295d4ad1c))
* ollama structured support ([#63](https://github.com/jacob-split/hindsight/issues/63)) ([32bca12](https://github.com/jacob-split/hindsight/commit/32bca12c6f47f26e0b7ae0e0a30bc6f9c49e92e0))
* propagate exceptions from task handlers to enable retry logic ([#65](https://github.com/jacob-split/hindsight/issues/65)) ([904ea4d](https://github.com/jacob-split/hindsight/commit/904ea4de24812eeeb625e3561454b0c4930d3308))
* retain async fails ([#40](https://github.com/jacob-split/hindsight/issues/40)) ([63f5138](https://github.com/jacob-split/hindsight/commit/63f51385c413c8ae57826c817e9c5628cb849ede))
* set max_completion_tokens to 100 in llm validation ([#59](https://github.com/jacob-split/hindsight/issues/59)) ([b94b5cf](https://github.com/jacob-split/hindsight/commit/b94b5cf26efa0ca73e6485e8e3d0fb336f95957a))
* **ui:** timestamp is not considered in retain ([#68](https://github.com/jacob-split/hindsight/issues/68)) ([234d426](https://github.com/jacob-split/hindsight/commit/234d4264999d653a803c97b80c838b7ab036c60d))
* update Docusaurus config for custom domain ([#20](https://github.com/jacob-split/hindsight/issues/20)) ([b5abeb5](https://github.com/jacob-split/hindsight/commit/b5abeb56131292ce05695a94c0182b3c4d52cfff))
* upgrade Next.js to 16.0.10 to patch CVE-2025-55184 and CVE-2025-55183 ([#25](https://github.com/jacob-split/hindsight/issues/25)) ([f018cc5](https://github.com/jacob-split/hindsight/commit/f018cc567756fe03439a4ea960582281093090bc))
* upgrade Next.js to 16.0.7 to patch CVE-2025-66478 ([#19](https://github.com/jacob-split/hindsight/issues/19)) ([b0c7bba](https://github.com/jacob-split/hindsight/commit/b0c7bba5a1500da4554f312e8dae2af68bfc9d3b))


### Chores

* sync repo ([437e129](https://github.com/jacob-split/hindsight/commit/437e1291b944bd2e64b4a21e17d9bf878ec221c3))
* update SDK settings ([c78ebe6](https://github.com/jacob-split/hindsight/commit/c78ebe6025aa80555745b4274ec00a27eaf2e0de))
* update SDK settings ([58bbc7c](https://github.com/jacob-split/hindsight/commit/58bbc7cca02bd51161c6ef8dc2892c764d4655cb))


### Documentation

* update documentation URL to custom domain ([#21](https://github.com/jacob-split/hindsight/issues/21)) ([6daa3ad](https://github.com/jacob-split/hindsight/commit/6daa3ad135ac0afdc9f5e89d1ec8b3f5c0012d31))
