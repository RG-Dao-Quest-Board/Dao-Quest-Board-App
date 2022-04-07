
export interface allForms {
    name: string,
    id: string,
    forms: Array<string>
}
export interface proposalConfig {
    allForms: allForms
}
export interface meta {
    allies: [],
    boosts: Object,
    contractAddress: string,
    description: string,
    name: string,
    network: string,
    purpose: string,
    proposalConfig: proposalConfig,
    slug: string
}
export interface daoType {
    id: string,
    loot: string,
    meta: meta,
    memberAddress: string,
    molochAddress: string,
    shares: string,
    tokenBalances: Array<Object>
    __typename: string
}

export interface userHubDaosType {
    apiMatch: string,
    data: Array<daoType>,
    endpoint: string,
    hubSortOrder: number,
    name: string,
    networkID: string,
    network_id: number
}
export type sortedDaosType = {
    networkDaos: daoType,
    count: number
}