export interface IShortCountry {
    name:string,
    alpha3Code: string,
    independent:boolean
}
// export interface IFullCountry{
//     name:string
//     region:string
//     population: number
//     borders:string[]
//     flags: {
//         svg: string
//     }
// }

// export interface IFullCountryUpdated extends IFullCountry{
//     borders: IShortCountry[]
// }