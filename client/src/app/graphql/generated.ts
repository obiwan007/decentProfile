import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A high precision floating point value represented as a string */
  BigFloat: { input: string; output: string; }
  /** An arbitrary size integer represented as a string */
  BigInt: { input: string; output: string; }
  /** An opaque string using for tracking a position in results during pagination */
  Cursor: { input: any; output: any; }
  /** A date wihout time information */
  Date: { input: string; output: string; }
  /** A date and time */
  Datetime: { input: string; output: string; }
  /** A Javascript Object Notation value serialized as a string */
  JSON: { input: string; output: string; }
  /** Any type not handled by the type system */
  Opaque: { input: any; output: any; }
  /** A time without date information */
  Time: { input: string; output: string; }
  /** A universally unique identifier */
  UUID: { input: string; output: string; }
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars['BigFloat']['input']>;
  gt?: InputMaybe<Scalars['BigFloat']['input']>;
  gte?: InputMaybe<Scalars['BigFloat']['input']>;
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigFloat']['input']>;
  lte?: InputMaybe<Scalars['BigFloat']['input']>;
  neq?: InputMaybe<Scalars['BigFloat']['input']>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  neq?: InputMaybe<Scalars['BigInt']['input']>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']['input']>;
  gt?: InputMaybe<Scalars['Datetime']['input']>;
  gte?: InputMaybe<Scalars['Datetime']['input']>;
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Datetime']['input']>;
  lte?: InputMaybe<Scalars['Datetime']['input']>;
  neq?: InputMaybe<Scalars['Datetime']['input']>;
};

export enum FilterIs {
  NOT_NULL = 'NOT_NULL',
  NULL = 'NULL'
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

/** Boolean expression comparing fields on type "ID" */
export type IDFilter = {
  eq?: InputMaybe<Scalars['ID']['input']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the `profiles` collection */
  deleteFromprofilesCollection: profilesDeleteResponse;
  /** Deletes zero or more records from the `steps` collection */
  deleteFromstepsCollection: stepsDeleteResponse;
  /** Deletes zero or more records from the `userprofiles` collection */
  deleteFromuserprofilesCollection: userprofilesDeleteResponse;
  /** Adds one or more `profiles` records to the collection */
  insertIntoprofilesCollection?: Maybe<profilesInsertResponse>;
  /** Adds one or more `steps` records to the collection */
  insertIntostepsCollection?: Maybe<stepsInsertResponse>;
  /** Adds one or more `userprofiles` records to the collection */
  insertIntouserprofilesCollection?: Maybe<userprofilesInsertResponse>;
  /** Updates zero or more records in the `profiles` collection */
  updateprofilesCollection: profilesUpdateResponse;
  /** Updates zero or more records in the `steps` collection */
  updatestepsCollection: stepsUpdateResponse;
  /** Updates zero or more records in the `userprofiles` collection */
  updateuserprofilesCollection: userprofilesUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationdeleteFromprofilesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<profilesFilter>;
};


/** The root type for creating and mutating data */
export type MutationdeleteFromstepsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<stepsFilter>;
};


/** The root type for creating and mutating data */
export type MutationdeleteFromuserprofilesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<userprofilesFilter>;
};


/** The root type for creating and mutating data */
export type MutationinsertIntoprofilesCollectionArgs = {
  objects: Array<profilesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationinsertIntostepsCollectionArgs = {
  objects: Array<stepsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationinsertIntouserprofilesCollectionArgs = {
  objects: Array<userprofilesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationupdateprofilesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<profilesFilter>;
  set: profilesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationupdatestepsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<stepsFilter>;
  set: stepsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationupdateuserprofilesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<userprofilesFilter>;
  set: userprofilesUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID']['output'];
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars['Opaque']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `profiles` */
  profilesCollection?: Maybe<profilesConnection>;
  /** A pagable collection of type `steps` */
  stepsCollection?: Maybe<stepsConnection>;
  /** A pagable collection of type `userprofiles` */
  userprofilesCollection?: Maybe<userprofilesConnection>;
};


/** The root type for querying data */
export type QuerynodeArgs = {
  nodeId: Scalars['ID']['input'];
};


/** The root type for querying data */
export type QueryprofilesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<profilesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<profilesOrderBy>>;
};


/** The root type for querying data */
export type QuerystepsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<stepsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<stepsOrderBy>>;
};


/** The root type for querying data */
export type QueryuserprofilesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<userprofilesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<userprofilesOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  iregex?: InputMaybe<Scalars['String']['input']>;
  is?: InputMaybe<FilterIs>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']['input']>;
  gt?: InputMaybe<Scalars['Time']['input']>;
  gte?: InputMaybe<Scalars['Time']['input']>;
  in?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Time']['input']>;
  lte?: InputMaybe<Scalars['Time']['input']>;
  neq?: InputMaybe<Scalars['Time']['input']>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UUIDFilter = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
};

export type profiles = Node & {
  __typename?: 'profiles';
  author?: Maybe<Scalars['String']['output']>;
  beverage_type?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['Datetime']['output'];
  id: Scalars['BigInt']['output'];
  isDefault?: Maybe<Scalars['Boolean']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  steps?: Maybe<Array<Maybe<Scalars['BigInt']['output']>>>;
  stepsCollection?: Maybe<stepsConnection>;
  tank_temperature?: Maybe<Scalars['Float']['output']>;
  target_volume?: Maybe<Scalars['Float']['output']>;
  target_volume_count_start?: Maybe<Scalars['Int']['output']>;
  target_weight?: Maybe<Scalars['Float']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['UUID']['output']>;
};


export type profilesstepsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<stepsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<stepsOrderBy>>;
};

export type profilesConnection = {
  __typename?: 'profilesConnection';
  edges: Array<profilesEdge>;
  pageInfo: PageInfo;
  /** The total number of records matching the `filter` criteria */
  totalCount: Scalars['Int']['output'];
};

export type profilesDeleteResponse = {
  __typename?: 'profilesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<profiles>;
};

export type profilesEdge = {
  __typename?: 'profilesEdge';
  cursor: Scalars['String']['output'];
  node: profiles;
};

export type profilesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<profilesFilter>>;
  author?: InputMaybe<StringFilter>;
  beverage_type?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  isDefault?: InputMaybe<BooleanFilter>;
  isPublic?: InputMaybe<BooleanFilter>;
  nodeId?: InputMaybe<IDFilter>;
  /** Negates a filter */
  not?: InputMaybe<profilesFilter>;
  notes?: InputMaybe<StringFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<profilesFilter>>;
  tank_temperature?: InputMaybe<FloatFilter>;
  target_volume?: InputMaybe<FloatFilter>;
  target_volume_count_start?: InputMaybe<IntFilter>;
  target_weight?: InputMaybe<FloatFilter>;
  title?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
  user_id?: InputMaybe<UUIDFilter>;
};

export type profilesInsertInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  beverage_type?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  steps?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  tank_temperature?: InputMaybe<Scalars['Float']['input']>;
  target_volume?: InputMaybe<Scalars['Float']['input']>;
  target_volume_count_start?: InputMaybe<Scalars['Int']['input']>;
  target_weight?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type profilesInsertResponse = {
  __typename?: 'profilesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<profiles>;
};

export type profilesOrderBy = {
  author?: InputMaybe<OrderByDirection>;
  beverage_type?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  isDefault?: InputMaybe<OrderByDirection>;
  isPublic?: InputMaybe<OrderByDirection>;
  notes?: InputMaybe<OrderByDirection>;
  tank_temperature?: InputMaybe<OrderByDirection>;
  target_volume?: InputMaybe<OrderByDirection>;
  target_volume_count_start?: InputMaybe<OrderByDirection>;
  target_weight?: InputMaybe<OrderByDirection>;
  title?: InputMaybe<OrderByDirection>;
  type?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
};

export type profilesUpdateInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  beverage_type?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  steps?: InputMaybe<Array<InputMaybe<Scalars['BigInt']['input']>>>;
  tank_temperature?: InputMaybe<Scalars['Float']['input']>;
  target_volume?: InputMaybe<Scalars['Float']['input']>;
  target_volume_count_start?: InputMaybe<Scalars['Int']['input']>;
  target_weight?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
};

export type profilesUpdateResponse = {
  __typename?: 'profilesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<profiles>;
};

export type steps = Node & {
  __typename?: 'steps';
  exit_condition?: Maybe<Scalars['String']['output']>;
  exit_type?: Maybe<Scalars['String']['output']>;
  exit_value?: Maybe<Scalars['Float']['output']>;
  flow?: Maybe<Scalars['Float']['output']>;
  id: Scalars['BigInt']['output'];
  index?: Maybe<Scalars['Int']['output']>;
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  limiter_range?: Maybe<Scalars['String']['output']>;
  limiter_value?: Maybe<Scalars['Float']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  pressure?: Maybe<Scalars['Float']['output']>;
  profile_id?: Maybe<Scalars['BigInt']['output']>;
  profiles?: Maybe<profiles>;
  pump?: Maybe<Scalars['String']['output']>;
  seconds?: Maybe<Scalars['Float']['output']>;
  sensor?: Maybe<Scalars['String']['output']>;
  temperature?: Maybe<Scalars['Float']['output']>;
  transition?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['UUID']['output']>;
  volume?: Maybe<Scalars['Float']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
};

export type stepsConnection = {
  __typename?: 'stepsConnection';
  edges: Array<stepsEdge>;
  pageInfo: PageInfo;
};

export type stepsDeleteResponse = {
  __typename?: 'stepsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<steps>;
};

export type stepsEdge = {
  __typename?: 'stepsEdge';
  cursor: Scalars['String']['output'];
  node: steps;
};

export type stepsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<stepsFilter>>;
  exit_condition?: InputMaybe<StringFilter>;
  exit_type?: InputMaybe<StringFilter>;
  exit_value?: InputMaybe<FloatFilter>;
  flow?: InputMaybe<FloatFilter>;
  id?: InputMaybe<BigIntFilter>;
  index?: InputMaybe<IntFilter>;
  isPublic?: InputMaybe<BooleanFilter>;
  limiter_range?: InputMaybe<StringFilter>;
  limiter_value?: InputMaybe<FloatFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IDFilter>;
  /** Negates a filter */
  not?: InputMaybe<stepsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<stepsFilter>>;
  pressure?: InputMaybe<FloatFilter>;
  profile_id?: InputMaybe<BigIntFilter>;
  pump?: InputMaybe<StringFilter>;
  seconds?: InputMaybe<FloatFilter>;
  sensor?: InputMaybe<StringFilter>;
  temperature?: InputMaybe<FloatFilter>;
  transition?: InputMaybe<StringFilter>;
  user_id?: InputMaybe<UUIDFilter>;
  volume?: InputMaybe<FloatFilter>;
  weight?: InputMaybe<FloatFilter>;
};

export type stepsInsertInput = {
  exit_condition?: InputMaybe<Scalars['String']['input']>;
  exit_type?: InputMaybe<Scalars['String']['input']>;
  exit_value?: InputMaybe<Scalars['Float']['input']>;
  flow?: InputMaybe<Scalars['Float']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  limiter_range?: InputMaybe<Scalars['String']['input']>;
  limiter_value?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pressure?: InputMaybe<Scalars['Float']['input']>;
  profile_id?: InputMaybe<Scalars['BigInt']['input']>;
  pump?: InputMaybe<Scalars['String']['input']>;
  seconds?: InputMaybe<Scalars['Float']['input']>;
  sensor?: InputMaybe<Scalars['String']['input']>;
  temperature?: InputMaybe<Scalars['Float']['input']>;
  transition?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
  volume?: InputMaybe<Scalars['Float']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type stepsInsertResponse = {
  __typename?: 'stepsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<steps>;
};

export type stepsOrderBy = {
  exit_condition?: InputMaybe<OrderByDirection>;
  exit_type?: InputMaybe<OrderByDirection>;
  exit_value?: InputMaybe<OrderByDirection>;
  flow?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  index?: InputMaybe<OrderByDirection>;
  isPublic?: InputMaybe<OrderByDirection>;
  limiter_range?: InputMaybe<OrderByDirection>;
  limiter_value?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  pressure?: InputMaybe<OrderByDirection>;
  profile_id?: InputMaybe<OrderByDirection>;
  pump?: InputMaybe<OrderByDirection>;
  seconds?: InputMaybe<OrderByDirection>;
  sensor?: InputMaybe<OrderByDirection>;
  temperature?: InputMaybe<OrderByDirection>;
  transition?: InputMaybe<OrderByDirection>;
  user_id?: InputMaybe<OrderByDirection>;
  volume?: InputMaybe<OrderByDirection>;
  weight?: InputMaybe<OrderByDirection>;
};

export type stepsUpdateInput = {
  exit_condition?: InputMaybe<Scalars['String']['input']>;
  exit_type?: InputMaybe<Scalars['String']['input']>;
  exit_value?: InputMaybe<Scalars['Float']['input']>;
  flow?: InputMaybe<Scalars['Float']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  limiter_range?: InputMaybe<Scalars['String']['input']>;
  limiter_value?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pressure?: InputMaybe<Scalars['Float']['input']>;
  profile_id?: InputMaybe<Scalars['BigInt']['input']>;
  pump?: InputMaybe<Scalars['String']['input']>;
  seconds?: InputMaybe<Scalars['Float']['input']>;
  sensor?: InputMaybe<Scalars['String']['input']>;
  temperature?: InputMaybe<Scalars['Float']['input']>;
  transition?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['UUID']['input']>;
  volume?: InputMaybe<Scalars['Float']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type stepsUpdateResponse = {
  __typename?: 'stepsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<steps>;
};

export type userprofiles = Node & {
  __typename?: 'userprofiles';
  avatar_url?: Maybe<Scalars['String']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  updated_at?: Maybe<Scalars['Datetime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
};

export type userprofilesConnection = {
  __typename?: 'userprofilesConnection';
  edges: Array<userprofilesEdge>;
  pageInfo: PageInfo;
};

export type userprofilesDeleteResponse = {
  __typename?: 'userprofilesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<userprofiles>;
};

export type userprofilesEdge = {
  __typename?: 'userprofilesEdge';
  cursor: Scalars['String']['output'];
  node: userprofiles;
};

export type userprofilesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<userprofilesFilter>>;
  avatar_url?: InputMaybe<StringFilter>;
  full_name?: InputMaybe<StringFilter>;
  id?: InputMaybe<UUIDFilter>;
  nodeId?: InputMaybe<IDFilter>;
  /** Negates a filter */
  not?: InputMaybe<userprofilesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<userprofilesFilter>>;
  updated_at?: InputMaybe<DatetimeFilter>;
  username?: InputMaybe<StringFilter>;
  website?: InputMaybe<StringFilter>;
};

export type userprofilesInsertInput = {
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type userprofilesInsertResponse = {
  __typename?: 'userprofilesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<userprofiles>;
};

export type userprofilesOrderBy = {
  avatar_url?: InputMaybe<OrderByDirection>;
  full_name?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  username?: InputMaybe<OrderByDirection>;
  website?: InputMaybe<OrderByDirection>;
};

export type userprofilesUpdateInput = {
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type userprofilesUpdateResponse = {
  __typename?: 'userprofilesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<userprofiles>;
};

export type DeleteProfileMutationVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;


export type DeleteProfileMutation = { __typename: 'Mutation', deleteFromprofilesCollection: { __typename: 'profilesDeleteResponse', affectedCount: number, records: Array<{ __typename: 'profiles', id: string }> } };

export type DeleteStepsForProfileMutationVariables = Exact<{
  id: Scalars['BigInt']['input'];
}>;


export type DeleteStepsForProfileMutation = { __typename: 'Mutation', deleteFromstepsCollection: { __typename: 'stepsDeleteResponse', affectedCount: number, records: Array<{ __typename: 'steps', id: string }> } };

export type InsertProfilesMutationVariables = Exact<{
  ep: Array<profilesInsertInput> | profilesInsertInput;
}>;


export type InsertProfilesMutation = { __typename: 'Mutation', insertIntoprofilesCollection?: { __typename: 'profilesInsertResponse', affectedCount: number, records: Array<{ __typename: 'profiles', id: string }> } | null };

export type InsertStepsMutationVariables = Exact<{
  ep: Array<stepsInsertInput> | stepsInsertInput;
}>;


export type InsertStepsMutation = { __typename: 'Mutation', insertIntostepsCollection?: { __typename: 'stepsInsertResponse', affectedCount: number, records: Array<{ __typename: 'steps', id: string }> } | null };

export type UpdateProfilesMutationVariables = Exact<{
  id: Scalars['BigInt']['input'];
  set: profilesUpdateInput;
}>;


export type UpdateProfilesMutation = { __typename: 'Mutation', updateprofilesCollection: { __typename: 'profilesUpdateResponse', affectedCount: number, records: Array<{ __typename: 'profiles', id: string }> } };

export type UpdateStepsMutationVariables = Exact<{
  id: Scalars['BigInt']['input'];
  set: stepsUpdateInput;
}>;


export type UpdateStepsMutation = { __typename: 'Mutation', updatestepsCollection: { __typename: 'stepsUpdateResponse', affectedCount: number, records: Array<{ __typename: 'steps', id: string }> } };

export type ProfileDetailsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['BigInt']['input']>;
}>;


export type ProfileDetailsQuery = { __typename: 'Query', profilesCollection?: { __typename: 'profilesConnection', pageInfo: { __typename: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename: 'profilesEdge', node: { __typename: 'profiles', id: string, created_at: string, title?: string | null, author?: string | null, notes?: string | null, type?: string | null, beverage_type?: string | null, target_volume?: number | null, target_weight?: number | null, isPublic?: boolean | null, isDefault?: boolean | null, target_volume_count_start?: number | null, tank_temperature?: number | null, stepsCollection?: { __typename: 'stepsConnection', edges: Array<{ __typename: 'stepsEdge', node: { __typename: 'steps', id: string, temperature?: number | null, sensor?: string | null, pump?: string | null, transition?: string | null, flow?: number | null, pressure?: number | null, seconds?: number | null, volume?: number | null, weight?: number | null, exit_type?: string | null, exit_condition?: string | null, exit_value?: number | null, limiter_value?: number | null, limiter_range?: string | null, profile_id?: string | null, name?: string | null, index?: number | null, isPublic?: boolean | null } }> } | null } }> } | null };

export type ProfilesListQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Cursor']['input']>;
  order?: InputMaybe<Array<profilesOrderBy> | profilesOrderBy>;
  filter?: InputMaybe<profilesFilter>;
}>;


export type ProfilesListQuery = { __typename: 'Query', profilesCollection?: { __typename: 'profilesConnection', totalCount: number, pageInfo: { __typename: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null }, edges: Array<{ __typename: 'profilesEdge', cursor: string, node: { __typename: 'profiles', id: string, created_at: string, title?: string | null, author?: string | null, notes?: string | null, type?: string | null, beverage_type?: string | null, target_volume?: number | null, target_weight?: number | null, isPublic?: boolean | null, isDefault?: boolean | null, target_volume_count_start?: number | null, tank_temperature?: number | null, stepsCollection?: { __typename: 'stepsConnection', edges: Array<{ __typename: 'stepsEdge', node: { __typename: 'steps', id: string, temperature?: number | null, sensor?: string | null, pump?: string | null, transition?: string | null, flow?: number | null, pressure?: number | null, seconds?: number | null, volume?: number | null, weight?: number | null, exit_type?: string | null, exit_condition?: string | null, exit_value?: number | null, limiter_value?: number | null, limiter_range?: string | null, profile_id?: string | null, name?: string | null, index?: number | null, isPublic?: boolean | null } }> } | null } }> } | null };

export const DeleteProfileDocument = gql`
    mutation DeleteProfile($id: BigInt!) {
  __typename
  deleteFromprofilesCollection(filter: {id: {eq: $id}}) {
    __typename
    affectedCount
    records {
      __typename
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteProfileGQL extends Apollo.Mutation<DeleteProfileMutation, DeleteProfileMutationVariables> {
    override document = DeleteProfileDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteStepsForProfileDocument = gql`
    mutation DeleteStepsForProfile($id: BigInt!) {
  __typename
  deleteFromstepsCollection(atMost: 20, filter: {profile_id: {eq: $id}}) {
    __typename
    affectedCount
    records {
      __typename
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteStepsForProfileGQL extends Apollo.Mutation<DeleteStepsForProfileMutation, DeleteStepsForProfileMutationVariables> {
    override document = DeleteStepsForProfileDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const InsertProfilesDocument = gql`
    mutation InsertProfiles($ep: [profilesInsertInput!]!) {
  __typename
  insertIntoprofilesCollection(objects: $ep) {
    __typename
    affectedCount
    records {
      __typename
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class InsertProfilesGQL extends Apollo.Mutation<InsertProfilesMutation, InsertProfilesMutationVariables> {
    override document = InsertProfilesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const InsertStepsDocument = gql`
    mutation InsertSteps($ep: [stepsInsertInput!]!) {
  __typename
  insertIntostepsCollection(objects: $ep) {
    __typename
    affectedCount
    records {
      __typename
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class InsertStepsGQL extends Apollo.Mutation<InsertStepsMutation, InsertStepsMutationVariables> {
    override document = InsertStepsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateProfilesDocument = gql`
    mutation UpdateProfiles($id: BigInt!, $set: profilesUpdateInput!) {
  __typename
  updateprofilesCollection(set: $set, filter: {id: {eq: $id}}) {
    __typename
    affectedCount
    records {
      __typename
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateProfilesGQL extends Apollo.Mutation<UpdateProfilesMutation, UpdateProfilesMutationVariables> {
    override document = UpdateProfilesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateStepsDocument = gql`
    mutation UpdateSteps($id: BigInt!, $set: stepsUpdateInput!) {
  __typename
  updatestepsCollection(set: $set, filter: {id: {eq: $id}}) {
    __typename
    affectedCount
    records {
      __typename
      id
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateStepsGQL extends Apollo.Mutation<UpdateStepsMutation, UpdateStepsMutationVariables> {
    override document = UpdateStepsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ProfileDetailsDocument = gql`
    query ProfileDetails($id: BigInt) {
  __typename
  profilesCollection(filter: {id: {eq: $id}}) {
    __typename
    pageInfo {
      __typename
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      __typename
      node {
        __typename
        id
        created_at
        title
        author
        notes
        type
        beverage_type
        target_volume
        target_weight
        isPublic
        isDefault
        target_volume_count_start
        tank_temperature
        stepsCollection(orderBy: [{index: AscNullsLast}]) {
          __typename
          edges {
            __typename
            node {
              __typename
              id
              temperature
              sensor
              pump
              transition
              flow
              pressure
              seconds
              volume
              weight
              exit_type
              exit_condition
              exit_value
              limiter_value
              limiter_range
              profile_id
              name
              index
              isPublic
            }
          }
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ProfileDetailsGQL extends Apollo.Query<ProfileDetailsQuery, ProfileDetailsQueryVariables> {
    override document = ProfileDetailsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ProfilesListDocument = gql`
    query ProfilesList($first: Int, $cursor: Cursor, $order: [profilesOrderBy!], $filter: profilesFilter) {
  __typename
  profilesCollection(
    first: $first
    after: $cursor
    orderBy: $order
    filter: $filter
  ) {
    __typename
    pageInfo {
      __typename
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      __typename
      cursor
      node {
        __typename
        id
        created_at
        title
        author
        notes
        type
        beverage_type
        target_volume
        target_weight
        isPublic
        isDefault
        target_volume_count_start
        tank_temperature
        stepsCollection(orderBy: [{index: AscNullsLast}]) {
          __typename
          edges {
            __typename
            node {
              __typename
              id
              temperature
              sensor
              pump
              transition
              flow
              pressure
              seconds
              volume
              weight
              exit_type
              exit_condition
              exit_value
              limiter_value
              limiter_range
              profile_id
              name
              index
              isPublic
            }
          }
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ProfilesListGQL extends Apollo.Query<ProfilesListQuery, ProfilesListQueryVariables> {
    override document = ProfilesListDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }