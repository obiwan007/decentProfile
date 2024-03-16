
// import type { CodegenConfig } from '@graphql-codegen/cli';

// const config: CodegenConfig = {
//   overwrite: true,
//   schema: "http://localhost:54321/graphql/v1",
//   documents: "src/**/*.ts",
//   generates: {
//     "src/generated/graphql.ts": {
//       plugins: ["typescript-apollo-angular"]
//     }
//   }
// };

// export default config;
import type { CodegenConfig } from '@graphql-codegen/cli'
import { addTypenameSelectionDocumentTransform } from '@graphql-codegen/client-preset'

import { environment } from './src/environments/environment'

const url = "https://sqtyykifanxudxvtjywm.supabase.co/graphql/v1?apiKey=" + environment.supabaseKey;

const config: CodegenConfig = {
  schema: [
    {
      "https://sqtyykifanxudxvtjywm.supabase.co/graphql/v1": {
        headers: {
          Authorization: `Bearer ${environment.supabaseKey}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          apiKey: `${environment.supabaseKey}`,
        },
      },
    },
  ],
  //'http://localhost:54321/graphql/v1', // Using the local endpoint, update if needed
  // documents: 'src/**/*.tsx',
  documents: 'src/**/*.graphql',
  overwrite: true,

  ignoreNoDocuments: true,
  generates: {
    'src/app/graphql/generated.ts': {
      overwrite: true,
      plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular'],
      documentTransforms: [addTypenameSelectionDocumentTransform],
      config: {
        preset: 'client',
        namingConvention: 'keep',
        addExplicitOverride: true,
        scalars: {
          UUID: 'string',
          Date: 'string',
          Time: 'string',
          Datetime: 'string',
          JSON: 'string',
          BigInt: 'string',
          BigFloat: 'string',
          Opaque: 'any',
        },
      },
    },
    // 'src/app/gql/': {
    //   preset: 'client',

    //   // documentTransforms: [addTypenameSelectionDocumentTransform],

    //   // plugins: ['apollo-angular'],
    //   plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular'],
    //   config: {
    //     addExplicitOverride: true,
    //     scalars: {
    //       UUID: 'string',
    //       Date: 'string',
    //       Time: 'string',
    //       Datetime: 'string',
    //       JSON: 'string',
    //       BigInt: 'string',
    //       BigFloat: 'string',
    //       Opaque: 'any',
    //     },
    //   },
    // },
  },
  hooks: {
    afterAllFileWrite: ['npm run prettier'], // optional
  },
}

export default config
