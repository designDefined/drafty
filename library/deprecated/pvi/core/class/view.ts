// import { PolicyKey } from "../types/common";
// import { ViewModel } from "../types/view";

// export class ViewPolicy<Deps extends unknown[], Model extends ViewModel> {
//   private _key: (...deps: Deps) => PolicyKey;
//   private _model: (...deps: Deps) => Model;
//   private _map: (
//     ...deps: Deps
//   ) => (mapFn: (prev: Model) => Model) => Promise<unknown>;
//   private _invalidate: (...deps: Deps) => () => Promise<void>;

//   constructor(param: (...deps: Deps) => { key: PolicyKey; model: Model }) {
//     this._key = (...deps: Deps) => param(...deps).key;
//     this._model = (...deps: Deps) => param(...deps).model;
//     this._invalidate = () => () => Promise.resolve();
//     this._map = () => (mapFn: (prev: Model) => Model) => Promise.resolve();
//   }

//   public inject(
//     invalidate: (...deps: Deps) => () => Promise<void>,
//     map: (...deps: Deps) => (mapFn: (prev: Model) => Model) => Promise<unknown>,
//   ) {
//     this._invalidate = invalidate;
//     this._map = map;
//   }

//   public read(...deps: Deps) {
//     return { key: this._key(...deps), model: this._model(...deps) };
//   }

//   public map(...deps: Deps) {
//     return this._map(...deps);
//   }

//   public invalidate(...deps: Deps) {
//     return this._invalidate(...deps);
//   }
// }
