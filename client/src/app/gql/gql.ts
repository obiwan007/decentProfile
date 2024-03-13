/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query profiles {\n  profilesCollection {\n    edges {\n      node {\n        id\n        created_at\n        title\n        author\n        notes\n        type\n        beverage_type\n        target_volume\n        target_weight\n      }\n    }\n  }\n}": types.ProfilesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query profiles {\n  profilesCollection {\n    edges {\n      node {\n        id\n        created_at\n        title\n        author\n        notes\n        type\n        beverage_type\n        target_volume\n        target_weight\n      }\n    }\n  }\n}"): (typeof documents)["query profiles {\n  profilesCollection {\n    edges {\n      node {\n        id\n        created_at\n        title\n        author\n        notes\n        type\n        beverage_type\n        target_volume\n        target_weight\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;