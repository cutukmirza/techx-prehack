/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/OpportunityIdentification` | `/Recommendations` | `/_sitemap` | `/data` | `/images` | `/index1` | `/result`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
