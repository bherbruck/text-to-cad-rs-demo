/* @ts-self-types="./cad_wasm.d.ts" */

/**
 * The engine, its kernel and every document, in memory.
 */
export class CadEngine {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CadEngineFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cadengine_free(ptr, 0);
    }
    /**
     * Makes a file readable by `import` ops. `path` is absolute, as the engine resolves it:
     * an import's `path` joined to the IR's `script` directory, unless already absolute.
     * @param {string} path
     * @param {Uint8Array | number[]} bytes
     */
    addFile(path, bytes) {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        wasm.cadengine_addFile(this.__wbg_ptr, ptr0, len0, ptr1, len1);
    }
    /**
     * Every part's placement `t` seconds into the animation `name` (docs/api.md "Animations"):
     * 16 numbers per part, column-major, in `Doc.parts` order. `t` is clamped to its duration.
     * @param {string} id
     * @param {string} name
     * @param {number} t
     * @returns {Float64Array}
     */
    animationMatrices(id, name, t) {
        const val3 = +t;
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.cadengine_animationMatrices(this.__wbg_ptr, ptr0, len0, ptr1, len1, val3);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v4 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
        return v4;
    }
    /**
     * Builds an IR envelope (docs/ir.md, as JSON). Returns `BuildResult` JSON. A model that
     * fails to build is not an exception: `ok` is false and `error` says why. Malformed JSON is.
     * @param {string} ir_json
     * @returns {string}
     */
    build(ir_json) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(ir_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.cadengine_build(this.__wbg_ptr, ptr0, len0);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
    /**
     * Drops the engine's memo caches (documents stay).
     */
    clearCache() {
        wasm.cadengine_clearCache(this.__wbg_ptr);
    }
    /**
     * One `Doc` as JSON.
     * @param {string} id
     * @returns {string}
     */
    doc(id) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.cadengine_doc(this.__wbg_ptr, ptr0, len0);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
    /**
     * `Doc[]` JSON, newest first.
     * @returns {string}
     */
    docs() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.cadengine_docs(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Exports the document. `format` is a suffix or file name: step, stp, stl, 3mf, glb, obj,
     * brep, dxf. `opts_json`: `{ tolerance?, angle? }` for mesh formats.
     * @param {string} id
     * @param {string} format
     * @param {string | null} [opts_json]
     * @returns {Uint8Array}
     */
    export(id, format, opts_json) {
        let ptr0, len0, ptr1, len1, ptr2, len2;
        try {
            ptr0 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = passStringToWasm0(format, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(opts_json) ? 0 : passStringToWasm0(opts_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len2 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.cadengine_export(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v4 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v4;
    }
    /**
     * `/api/health`: `{ ok, version, kernel, kernelVersion }` as JSON.
     * @returns {string}
     */
    health() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.cadengine_health(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * `Inspect` JSON for a reference (`<id>#<part>[/face n|/edge n]`), or the `Doc` without one.
     * @param {string} id
     * @param {string | null} [reference]
     * @returns {string}
     */
    inspect(id, reference) {
        let deferred4_0;
        let deferred4_1;
        try {
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                len0 = WASM_VECTOR_LEN;
                ptr1 = isLikeNone(reference) ? 0 : passStringToWasm0(reference, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
                throw e;
            }
            const ret = wasm.cadengine_inspect(this.__wbg_ptr, ptr0, len0, ptr1, len1);
            var ptr3 = ret[0];
            var len3 = ret[1];
            if (ret[3]) {
                ptr3 = 0; len3 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred4_0 = ptr3;
            deferred4_1 = len3;
            return getStringFromWasm0(ptr3, len3);
        } finally {
            wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
        }
    }
    /**
     * `{ pairs: [{ a, b, volume }], unmeasured: [...] }` JSON: parts that share volume, and
     * pairs whose boolean failed (not known to be clear). With `pose` (a pose name or JSON
     * joint values), at that pose.
     * @param {string} id
     * @param {string | null} [pose]
     * @returns {string}
     */
    interference(id, pose) {
        let deferred4_0;
        let deferred4_1;
        try {
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                len0 = WASM_VECTOR_LEN;
                ptr1 = isLikeNone(pose) ? 0 : passStringToWasm0(pose, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
                throw e;
            }
            const ret = wasm.cadengine_interference(this.__wbg_ptr, ptr0, len0, ptr1, len1);
            var ptr3 = ret[0];
            var len3 = ret[1];
            if (ret[3]) {
                ptr3 = 0; len3 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred4_0 = ptr3;
            deferred4_1 = len3;
            return getStringFromWasm0(ptr3, len3);
        } finally {
            wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
        }
    }
    /**
     * The kernel's version string, e.g. "OCCT 8.0.1".
     * @returns {string}
     */
    kernelVersion() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.cadengine_kernelVersion(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * This engine's kernel name.
     * @returns {string}
     */
    kernel() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.cadengine_kernel(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * The kernels this build has.
     * @returns {string[]}
     */
    static kernels() {
        const ret = wasm.cadengine_kernels();
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]);
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * The mesh with typed arrays instead of base64:
     * `{ id, version, parts: [{ path, label, color, positions: Float32Array, normals: Float32Array,
     * indices: Uint32Array, faceRanges: [n,n][], edgePositions: Float32Array, edgeRanges: [n,n][] }] }`.
     * @param {string} id
     * @returns {MeshBuffers}
     */
    meshBuffers(id) {
        const ptr0 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.cadengine_meshBuffers(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * `MeshPayload` JSON (typed arrays as base64), as the server's `/mesh`.
     * @param {string} id
     * @returns {string}
     */
    mesh(id) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.cadengine_mesh(this.__wbg_ptr, ptr0, len0);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
    /**
     * An engine on `kernel` ("occt" or "solidcore"; default: this build's first, see
     * `CadEngine.kernels()`). The occt kernel needs `globalThis.occtCapi` set first.
     * @param {string | null} [kernel]
     */
    constructor(kernel) {
        var ptr0 = isLikeNone(kernel) ? 0 : passStringToWasm0(kernel, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.cadengine_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0];
        CadEngineFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Opens a STEP or STL file (by its name's suffix) as a document. Returns `Doc` JSON.
     * @param {string} path
     * @param {Uint8Array | number[]} bytes
     * @returns {string}
     */
    openFile(path, bytes) {
        let deferred4_0;
        let deferred4_1;
        try {
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
                throw e;
            }
            const ret = wasm.cadengine_openFile(this.__wbg_ptr, ptr0, len0, ptr1, len1);
            var ptr3 = ret[0];
            var len3 = ret[1];
            if (ret[3]) {
                ptr3 = 0; len3 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred4_0 = ptr3;
            deferred4_1 = len3;
            return getStringFromWasm0(ptr3, len3);
        } finally {
            wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
        }
    }
    /**
     * Every part's placement at a pose (a pose name or JSON joint values; empty: as built):
     * 16 numbers per part, column-major (three.js `Matrix4.fromArray(m, 16 * i)`), parts in
     * `Doc.parts` order. The viewer can also compute these itself (docs/api.md "Mechanisms").
     * @param {string} id
     * @param {string | null} [pose]
     * @returns {Float64Array}
     */
    poseMatrices(id, pose) {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(pose) ? 0 : passStringToWasm0(pose, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.cadengine_poseMatrices(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v3 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
        return v3;
    }
    /**
     * The document posed (a pose name or JSON joint values), as `Doc` JSON: parts' bounds,
     * centres and the joints' axes where the pose puts them. The stored document is unchanged.
     * @param {string} id
     * @param {string} pose
     * @returns {string}
     */
    posedDoc(id, pose) {
        let deferred4_0;
        let deferred4_1;
        try {
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                len0 = WASM_VECTOR_LEN;
                ptr1 = passStringToWasm0(pose, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
                throw e;
            }
            const ret = wasm.cadengine_posedDoc(this.__wbg_ptr, ptr0, len0, ptr1, len1);
            var ptr3 = ret[0];
            var len3 = ret[1];
            if (ret[3]) {
                ptr3 = 0; len3 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred4_0 = ptr3;
            deferred4_1 = len3;
            return getStringFromWasm0(ptr3, len3);
        } finally {
            wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
        }
    }
    /**
     * Joint stops from the geometry (docs/api.md "Ranges"). `opts_json`:
     * `{ joints?: string[], step?: 1, clearance?: 0.3 }`. Returns `Ranges` JSON.
     * @param {string} id
     * @param {string | null} [opts_json]
     * @returns {string}
     */
    ranges(id, opts_json) {
        let deferred4_0;
        let deferred4_1;
        try {
            let ptr0, len0, ptr1, len1;
            try {
                ptr0 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                len0 = WASM_VECTOR_LEN;
                ptr1 = isLikeNone(opts_json) ? 0 : passStringToWasm0(opts_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
                len1 = WASM_VECTOR_LEN;
            } catch (e) {
                if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
                if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
                throw e;
            }
            const ret = wasm.cadengine_ranges(this.__wbg_ptr, ptr0, len0, ptr1, len1);
            var ptr3 = ret[0];
            var len3 = ret[1];
            if (ret[3]) {
                ptr3 = 0; len3 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred4_0 = ptr3;
            deferred4_1 = len3;
            return getStringFromWasm0(ptr3, len3);
        } finally {
            wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
        }
    }
    /**
     * Removes a document. Returns whether there was one.
     * @param {string} id
     * @returns {boolean}
     */
    removeDoc(id) {
        const ptr0 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.cadengine_removeDoc(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Forgets a file added with `addFile`.
     * @param {string} path
     * @returns {boolean}
     */
    removeFile(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.cadengine_removeFile(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * A turntable as an animated GIF. `turntable_json`: `{ frames?: 24, degrees?: 360, fps?: 12,
     * animate?: false }`. `progress` as `render`'s, with `frame` added.
     * @param {string} id
     * @param {string | null} [opts_json]
     * @param {string | null} [turntable_json]
     * @param {Function | null} [progress]
     * @returns {Uint8Array}
     */
    renderTurntable(id, opts_json, turntable_json, progress) {
        let ptr0, len0, ptr1, len1, ptr2, len2;
        try {
            ptr0 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(opts_json) ? 0 : passStringToWasm0(opts_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
            ptr2 = isLikeNone(turntable_json) ? 0 : passStringToWasm0(turntable_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len2 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr2) { wasm.__wbindgen_free(ptr2, len2 * 1, 1); }
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.cadengine_renderTurntable(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2, isLikeNone(progress) ? 0 : addToExternrefTable0(progress));
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v4 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v4;
    }
    /**
     * A photoreal render as PNG bytes (docs/api.md "Render"). `opts_json`: RenderOptions
     * (`{ preset?, camera?, width?, samples?, environment?, background?, pose?, animation?, time?, … }`).
     * `progress`, if given, is called after each pass with
     * `{ samples, total, width, height, rgba: Uint8ClampedArray }` (an `ImageData`'s pixels, tone
     * mapped, not yet denoised); returning `false` stops early with the image so far. Single
     * threaded: run it in a worker.
     * @param {string} id
     * @param {string | null} [opts_json]
     * @param {Function | null} [progress]
     * @returns {Uint8Array}
     */
    render(id, opts_json, progress) {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(opts_json) ? 0 : passStringToWasm0(opts_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.cadengine_render(this.__wbg_ptr, ptr0, len0, ptr1, len1, isLikeNone(progress) ? 0 : addToExternrefTable0(progress));
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v3;
    }
    /**
     * What every document's `url` starts with, followed by its id. Default `#/view/`.
     * @param {string} prefix
     */
    setUrlPrefix(prefix) {
        const ptr0 = passStringToWasm0(prefix, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.cadengine_setUrlPrefix(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * A PNG of the document. `opts_json`: `{ camera?, display?, width?, height?, part? }`
     * (docs/api.md, Snapshot).
     * @param {string} id
     * @param {string | null} [opts_json]
     * @returns {Uint8Array}
     */
    snapshot(id, opts_json) {
        let ptr0, len0, ptr1, len1;
        try {
            ptr0 = passStringToWasm0(id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len0 = WASM_VECTOR_LEN;
            ptr1 = isLikeNone(opts_json) ? 0 : passStringToWasm0(opts_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            len1 = WASM_VECTOR_LEN;
        } catch (e) {
            if (ptr1) { wasm.__wbindgen_free(ptr1, len1 * 1, 1); }
            if (ptr0) { wasm.__wbindgen_free(ptr0, len0 * 1, 1); }
            throw e;
        }
        const ret = wasm.cadengine_snapshot(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v3;
    }
    /**
     * The engine's (crate) version.
     * @returns {string}
     */
    static version() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.cadengine_version();
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) CadEngine.prototype[Symbol.dispose] = CadEngine.prototype.free;
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg_Error_208446807d0d1e30: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg___wbindgen_is_function_741ff2bb612836f5: function(arg0) {
            const ret = typeof(arg0) === 'function';
            return ret;
        },
        __wbg___wbindgen_is_object_8b968c3ab8e96595: function(arg0) {
            const val = arg0;
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg___wbindgen_is_undefined_be5b34249ff1fc15: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_jsval_eq_38d7bfbe4cc84039: function(arg0, arg1) {
            const ret = arg0 === arg1;
            return ret;
        },
        __wbg___wbindgen_number_get_934b640d0889af78: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64((arg0 >>> 0) + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_string_get_7ce8eee7fd327545: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_4c88d8bf264fd984: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg__occt_abi_version_8ef3ffae482cc98a: function() {
            const ret = occtCapi._occt_abi_version();
            return ret;
        },
        __wbg__occt_alloc_57b8cc4aa74ebd4f: function(arg0) {
            const ret = occtCapi._occt_alloc(arg0 >>> 0);
            return ret;
        },
        __wbg__occt_ancestors_9df28f1478e08e43: function(arg0, arg1, arg2) {
            const ret = occtCapi._occt_ancestors(arg0 >>> 0, arg1 >>> 0, arg2);
            return ret;
        },
        __wbg__occt_area_08b6e78a878a4297: function(arg0) {
            const ret = occtCapi._occt_area(arg0 >>> 0);
            return ret;
        },
        __wbg__occt_boolean_general_c3d3d2417539955e: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = occtCapi._occt_boolean_general(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0, arg3, arg4 >>> 0, arg5 >>> 0);
            return ret;
        },
        __wbg__occt_bounding_box_2d98c19bf8a7f714: function(arg0) {
            const ret = occtCapi._occt_bounding_box(arg0 >>> 0);
            return ret;
        },
        __wbg__occt_buffer_free_26e77953447a7b52: function(arg0) {
            occtCapi._occt_buffer_free(arg0 >>> 0);
        },
        __wbg__occt_buffer_len_48e614297a78d5d3: function(arg0) {
            const ret = occtCapi._occt_buffer_len(arg0 >>> 0);
            return ret;
        },
        __wbg__occt_buffer_ptr_177f4e4b4145d95e: function(arg0) {
            const ret = occtCapi._occt_buffer_ptr(arg0 >>> 0);
            return ret;
        },
        __wbg__occt_center_of_mass_42304d6b804e9f01: function(arg0) {
            const ret = occtCapi._occt_center_of_mass(arg0 >>> 0);
            return ret;
        },
        __wbg__occt_chamfer_edges_69c18793f0d101d7: function(arg0, arg1, arg2) {
            const ret = occtCapi._occt_chamfer_edges(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg__occt_dealloc_d1daf5d5ddad0ef2: function(arg0) {
            occtCapi._occt_dealloc(arg0 >>> 0);
        },
        __wbg__occt_distance_8eea1e42af2b80a0: function(arg0, arg1) {
            const ret = occtCapi._occt_distance(arg0 >>> 0, arg1 >>> 0);
            return ret;
        },
        __wbg__occt_edge_geometry_8d99514a3ee4e6c9: function(arg0) {
            const ret = occtCapi._occt_edge_geometry(arg0 >>> 0);
            return ret;
        },
        __wbg__occt_edge_point_9d3438ec8a1d4636: function(arg0, arg1) {
            const ret = occtCapi._occt_edge_point(arg0 >>> 0, arg1);
            return ret;
        },
        __wbg__occt_extrude_2b08112c07f60fd8: function(arg0, arg1, arg2, arg3) {
            const ret = occtCapi._occt_extrude(arg0 >>> 0, arg1, arg2, arg3);
            return ret;
        },
        __wbg__occt_extrude_tapered_a1d3b228a74b6c2e: function(arg0, arg1, arg2, arg3, arg4) {
            const ret = occtCapi._occt_extrude_tapered(arg0 >>> 0, arg1, arg2, arg3, arg4);
            return ret;
        },
        __wbg__occt_face_geometry_df563841110bf281: function(arg0) {
            const ret = occtCapi._occt_face_geometry(arg0 >>> 0);
            return ret;
        },
        __wbg__occt_face_point_af005c53621c4126: function(arg0, arg1, arg2) {
            const ret = occtCapi._occt_face_point(arg0 >>> 0, arg1, arg2);
            return ret;
        },
        __wbg__occt_face_surface_kind_7a80fde100006f2a: function(arg0) {
            const ret = occtCapi._occt_face_surface_kind(arg0 >>> 0);
            return ret;
        },
        __wbg__occt_face_wires_84ec758a533b01fe: function(arg0) {
            const ret = occtCapi._occt_face_wires(arg0 >>> 0);
            return ret;
        },
        __wbg__occt_fillet_edges_c10fa8613f6d5daa: function(arg0, arg1, arg2) {
            const ret = occtCapi._occt_fillet_edges(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg__occt_hidden_lines_96bda26e2c956da7: function(arg0, arg1, arg2) {
            const ret = occtCapi._occt_hidden_lines(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg__occt_interpolate_curve_278daa78459a3c9d: function(arg0, arg1, arg2) {
            const ret = occtCapi._occt_interpolate_curve(arg0 >>> 0, arg1 >>> 0, arg2);
            return ret;
        },
        __wbg__occt_is_closed_8ac22932991da1b7: function(arg0) {
            const ret = occtCapi._occt_is_closed(arg0 >>> 0);
            return ret;
        },
        __wbg__occt_last_error_len_824768a00377d62c: function() {
            const ret = occtCapi._occt_last_error_len();
            return ret;
        },
        __wbg__occt_last_error_ptr_34c2396d8064543c: function() {
            const ret = occtCapi._occt_last_error_ptr();
            return ret;
        },
        __wbg__occt_length_dc8b9ed561ec766a: function(arg0) {
            const ret = occtCapi._occt_length(arg0 >>> 0);
            return ret;
        },
        __wbg__occt_library_version_len_476576d3bde3616e: function() {
            const ret = occtCapi._occt_library_version_len();
            return ret;
        },
        __wbg__occt_library_version_ptr_e1002318f884f4be: function() {
            const ret = occtCapi._occt_library_version_ptr();
            return ret;
        },
        __wbg__occt_loft_5b46011f2c8c80d8: function(arg0, arg1, arg2, arg3, arg4) {
            const ret = occtCapi._occt_loft(arg0 >>> 0, arg1 >>> 0, arg2, arg3, arg4);
            return ret;
        },
        __wbg__occt_make_box_e657b8b8ddcb7384: function(arg0, arg1, arg2, arg3, arg4, arg5) {
            const ret = occtCapi._occt_make_box(arg0, arg1, arg2, arg3, arg4, arg5);
            return ret;
        },
        __wbg__occt_make_compound_8ab9e74a682db95a: function(arg0, arg1) {
            const ret = occtCapi._occt_make_compound(arg0 >>> 0, arg1 >>> 0);
            return ret;
        },
        __wbg__occt_make_cone_580e58c09eb00858: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
            const ret = occtCapi._occt_make_cone(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);
            return ret;
        },
        __wbg__occt_make_cylinder_492bb0d7e7c812af: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            const ret = occtCapi._occt_make_cylinder(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7);
            return ret;
        },
        __wbg__occt_make_edge_1199a65da0f9e5df: function(arg0, arg1) {
            const ret = occtCapi._occt_make_edge(arg0 >>> 0, arg1 >>> 0);
            return ret;
        },
        __wbg__occt_make_helix_1f8f7c883ba04a5c: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
            const ret = occtCapi._occt_make_helix(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
            return ret;
        },
        __wbg__occt_make_planar_face_61c43e512c6c8b16: function(arg0, arg1, arg2) {
            const ret = occtCapi._occt_make_planar_face(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg__occt_make_polygon_face_cc9a4455350115a5: function(arg0, arg1) {
            const ret = occtCapi._occt_make_polygon_face(arg0 >>> 0, arg1 >>> 0);
            return ret;
        },
        __wbg__occt_make_solid_76875956cc656ec9: function(arg0) {
            const ret = occtCapi._occt_make_solid(arg0 >>> 0);
            return ret;
        },
        __wbg__occt_make_sphere_8f5f584a6b74e08d: function(arg0, arg1, arg2, arg3) {
            const ret = occtCapi._occt_make_sphere(arg0, arg1, arg2, arg3);
            return ret;
        },
        __wbg__occt_make_torus_23f93af59bec0b95: function(arg0, arg1) {
            const ret = occtCapi._occt_make_torus(arg0 >>> 0, arg1 >>> 0);
            return ret;
        },
        __wbg__occt_make_wire_81d61acaba86fb44: function(arg0, arg1) {
            const ret = occtCapi._occt_make_wire(arg0 >>> 0, arg1 >>> 0);
            return ret;
        },
        __wbg__occt_mesh_6239c7a005f64d08: function(arg0, arg1, arg2, arg3) {
            const ret = occtCapi._occt_mesh(arg0 >>> 0, arg1, arg2, arg3);
            return ret;
        },
        __wbg__occt_native_read_e67c758de9bdcb61: function(arg0, arg1) {
            const ret = occtCapi._occt_native_read(arg0 >>> 0, arg1 >>> 0);
            return ret;
        },
        __wbg__occt_native_write_950a4f3fb498e74d: function(arg0, arg1) {
            const ret = occtCapi._occt_native_write(arg0 >>> 0, arg1);
            return ret;
        },
        __wbg__occt_offset_0806805da7f7316a: function(arg0, arg1) {
            const ret = occtCapi._occt_offset(arg0 >>> 0, arg1);
            return ret;
        },
        __wbg__occt_placed_97a883382c08f9ab: function(arg0, arg1, arg2) {
            const ret = occtCapi._occt_placed(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg__occt_project_onto_face_3385f4e368b79d9f: function(arg0, arg1, arg2, arg3) {
            const ret = occtCapi._occt_project_onto_face(arg0 >>> 0, arg1, arg2, arg3);
            return ret;
        },
        __wbg__occt_revolve_0867586b8b9aca79: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            const ret = occtCapi._occt_revolve(arg0 >>> 0, arg1, arg2, arg3, arg4, arg5, arg6, arg7);
            return ret;
        },
        __wbg__occt_rotate_6f3b92289eb05a1a: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            const ret = occtCapi._occt_rotate(arg0 >>> 0, arg1, arg2, arg3, arg4, arg5, arg6, arg7);
            return ret;
        },
        __wbg__occt_scale_8e41055ab628adb0: function(arg0, arg1, arg2, arg3, arg4) {
            const ret = occtCapi._occt_scale(arg0 >>> 0, arg1, arg2, arg3, arg4);
            return ret;
        },
        __wbg__occt_section_plane_3e6eedb0d74a68ec: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
            const ret = occtCapi._occt_section_plane(arg0 >>> 0, arg1, arg2, arg3, arg4, arg5, arg6);
            return ret;
        },
        __wbg__occt_sew_2de2ebc8f4858470: function(arg0, arg1, arg2) {
            const ret = occtCapi._occt_sew(arg0 >>> 0, arg1 >>> 0, arg2);
            return ret;
        },
        __wbg__occt_shape_clone_cf723ea46cba1498: function(arg0) {
            const ret = occtCapi._occt_shape_clone(arg0 >>> 0);
            return ret;
        },
        __wbg__occt_shape_free_a19951f24db20236: function(arg0) {
            occtCapi._occt_shape_free(arg0 >>> 0);
        },
        __wbg__occt_shape_hash_9f475746cb2f95a3: function(arg0) {
            const ret = occtCapi._occt_shape_hash(arg0 >>> 0);
            return ret;
        },
        __wbg__occt_shape_is_same_769b2e0ddb7e6f63: function(arg0, arg1) {
            const ret = occtCapi._occt_shape_is_same(arg0 >>> 0, arg1 >>> 0);
            return ret;
        },
        __wbg__occt_shape_is_valid_187b0d94dc847cda: function(arg0) {
            const ret = occtCapi._occt_shape_is_valid(arg0 >>> 0);
            return ret;
        },
        __wbg__occt_shape_kind_80d91ed1b3abb4e8: function(arg0) {
            const ret = occtCapi._occt_shape_kind(arg0 >>> 0);
            return ret;
        },
        __wbg__occt_shape_subshapes_95a7fe42641c6468: function(arg0, arg1) {
            const ret = occtCapi._occt_shape_subshapes(arg0 >>> 0, arg1);
            return ret;
        },
        __wbg__occt_shell_832ef8f988fb9109: function(arg0, arg1, arg2, arg3) {
            const ret = occtCapi._occt_shell(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0, arg3);
            return ret;
        },
        __wbg__occt_split_6ffcaa0c77e21f3c: function(arg0, arg1, arg2, arg3, arg4) {
            const ret = occtCapi._occt_split(arg0 >>> 0, arg1 >>> 0, arg2, arg3 >>> 0, arg4 >>> 0);
            return ret;
        },
        __wbg__occt_step_document_read_4392a8c1045b3091: function(arg0, arg1, arg2) {
            const ret = occtCapi._occt_step_document_read(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg__occt_step_document_write_e78d9d91fdddbdb2: function(arg0, arg1, arg2, arg3, arg4) {
            const ret = occtCapi._occt_step_document_write(arg0 >>> 0, arg1 >>> 0, arg2, arg3, arg4 >>> 0);
            return ret;
        },
        __wbg__occt_sweep_53900f35bfc6b02c: function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
            const ret = occtCapi._occt_sweep(arg0 >>> 0, arg1 >>> 0, arg2, arg3, arg4, arg5, arg6, arg7);
            return ret;
        },
        __wbg__occt_tessellate_a6923edd5a3a9f56: function(arg0, arg1, arg2, arg3, arg4) {
            const ret = occtCapi._occt_tessellate(arg0 >>> 0, arg1, arg2, arg3, arg4 >>> 0);
            return ret;
        },
        __wbg__occt_transformed_0583b6c468cc92e3: function(arg0, arg1, arg2) {
            const ret = occtCapi._occt_transformed(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg__occt_translate_463c93588806fafa: function(arg0, arg1, arg2, arg3) {
            const ret = occtCapi._occt_translate(arg0 >>> 0, arg1, arg2, arg3);
            return ret;
        },
        __wbg__occt_volume_9298949a4a4dc314: function(arg0) {
            const ret = occtCapi._occt_volume(arg0 >>> 0);
            return ret;
        },
        __wbg_call_40b008ba32f73991: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.call(arg1);
            return ret;
        }, arguments); },
        __wbg_call_a410eb4b59ed5965: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_error_757e9472f8410341: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_get_2080c49015e35254: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_instanceof_Uint8Array_d7aeb0dcb3108fea: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Uint8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_length_186163212ffe79c3: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_new_0_36d738a0c8cfac43: function() {
            const ret = new Date();
            return ret;
        },
        __wbg_new_37eb45aaf5eeb820: function() {
            const ret = new Array();
            return ret;
        },
        __wbg_new_bb74001155cb8ca8: function() {
            const ret = new Error();
            return ret;
        },
        __wbg_new_cd4348290afae586: function() {
            const ret = new Object();
            return ret;
        },
        __wbg_new_from_slice_3512352010266e02: function(arg0, arg1) {
            const ret = new Uint32Array(getArrayU32FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_from_slice_355c10c5d8f2addb: function(arg0, arg1) {
            const ret = new Float32Array(getArrayF32FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_new_from_slice_c7cf3126a626653c: function(arg0, arg1) {
            const ret = new Uint8ClampedArray(getArrayU8FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_now_463ac581d2fc7ea3: function() {
            const ret = Date.now();
            return ret;
        },
        __wbg_prototypesetcall_13162965d1fe7aa3: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbg_push_c9f4893fc209f768: function(arg0, arg1) {
            const ret = arg0.push(arg1);
            return ret;
        },
        __wbg_set_2793479888329cb6: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.set(arg0, arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_set_feb3714f475485ba: function(arg0, arg1, arg2) {
            arg0.set(getArrayU8FromWasm0(arg1, arg2));
        },
        __wbg_stack_575c4e0918581b9c: function(arg0, arg1) {
            const ret = arg1.stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 1, len1, true);
            getDataViewMemory0().setInt32((arg0 >>> 0) + 4 * 0, ptr1, true);
        },
        __wbg_static_accessor_GLOBAL_THIS_003ee833af9699fc: function() {
            const ret = typeof globalThis === 'undefined' ? undefined : globalThis;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_GLOBAL_e4293fb22cbe77da: function() {
            const ret = typeof global === 'undefined' ? undefined : global;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_SELF_53bb20457401453d: function() {
            const ret = typeof self === 'undefined' ? undefined : self;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_WINDOW_b5e0810bfecb7feb: function() {
            const ret = typeof window === 'undefined' ? undefined : window;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_subarray_58f388a9247ac0bb: function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_toISOString_51ebc75332aba76a: function(arg0) {
            const ret = arg0.toISOString();
            return ret;
        },
        __wbindgen_generic_0000000000000001: function(arg0) {
            // Cast intrinsic for `F64 -> Externref`.
            const ret = arg0;
            return ret;
        },
        __wbindgen_generic_0000000000000002: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            table.set(0, undefined);
            table.set(1024, undefined);
            table.set(1025, null);
            table.set(1026, true);
            table.set(1027, false);
        },
    };
    return {
        __proto__: null,
        "./cad_wasm_bg.js": import0,
    };
}

const CadEngineFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_cadengine_free(ptr, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayF64FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

let cachedFloat64ArrayMemory0 = null;
function getFloat64ArrayMemory0() {
    if (cachedFloat64ArrayMemory0 === null || cachedFloat64ArrayMemory0.byteLength === 0) {
        cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(bytes) {
    numBytesDecoded += bytes.length;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true });
        cachedTextDecoder.decode();
        numBytesDecoded = bytes.length;
    }
    return cachedTextDecoder.decode(bytes);
}

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasmInstance, wasm;
function __wbg_finalize_init(instance, module) {
    wasmInstance = instance;
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedFloat32ArrayMemory0 = null;
    cachedFloat64ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (!module.ok) {
            throw new Error(`failed to fetch Wasm: ${module.status} ${module.statusText} fetching '${module.url}'`);
        }

        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

let __wbg_init_promise;
async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;
    if (__wbg_init_promise === undefined) {
        __wbg_init_promise = __wbg_init_once(module_or_path);
        __wbg_init_promise.catch(() => { __wbg_init_promise = undefined; });
    }
    return __wbg_init_promise;
}

async function __wbg_init_once(module_or_path) {

    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('cad_wasm_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
