import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApplicationConfig, inject } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { defaultDataIdFromObject } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { relayStylePagination } from '@apollo/client/utilities'
import { SupabaseService } from './services/supabase.service';
import { environment } from '../environments/environment';

const uri = `${environment.supabaseUrl}/graphql/v1`; // <-- add the URL of the GraphQL server here
export function apolloOptionsFactory(): ApolloClientOptions<any> {

  // const cache = new InMemoryCache({
  //   dataIdFromObject(responseObject) {
  //     if ('nodeId' in responseObject) {
  //       return `${responseObject['nodeId']}`
  //     }

  //     return defaultDataIdFromObject(responseObject)
  //   },
  //   possibleTypes: { Node: ['Todos'] }, // optional, but useful to specify supertype-subtype relationships
  //   typePolicies: {
  //     Query: {
  //       fields: {
  //         todosCollection: relayStylePagination(), // example of paginating a collection
  //         node: {
  //           read(_, { args, toReference }) {
  //             const ref = toReference({
  //               nodeId: args?.['nodeId'],
  //             })

  //             return ref
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  const httpLink = inject(HttpLink);

  const supabase = inject(SupabaseService);

  const authLink = setContext(async (_, { headers }) => {
    const token = supabase.session?.access_token

    return {
      headers: {
        ...headers,
        apiKey: environment.supabaseKey,
        Authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  return {
    link: authLink.concat(httpLink.create({ uri })),
    cache: new InMemoryCache(),
  };
}

export const graphqlProvider: ApplicationConfig['providers'] = [
  Apollo,
  {
    provide: APOLLO_OPTIONS,
    useFactory: apolloOptionsFactory,
  },
];
