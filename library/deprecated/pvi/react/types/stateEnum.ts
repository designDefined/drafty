import { TypeOf } from "zod";
import { ViewModel } from "@pvi/core/types/view";

export type ViewStateEnum<Model extends ViewModel> =
  | {
      status: "IDLE";
      data: null;
      error: null;
      isLoaded: false;
      isFetching: false;
    }
  | {
      status: "LOADING";
      data: null;
      error: null;
      isLoaded: false;
      isFetching: true;
    }
  | {
      status: "SUCCESS";
      data: TypeOf<Model>;
      error: null;
      isLoaded: true;
      isFetching: false;
    }
  | {
      status: "FAIL";
      data: null;
      error: unknown;
      isLoaded: false;
      isFetching: false;
    }
  | {
      status: "UPDATING";
      data: TypeOf<Model>;
      error: null;
      isLoaded: true;
      isFetching: true;
    };
