import { Postagem } from "./Postagem"

export class Tema{
    public id: number
    public nome: string
    public titulo: string
    public descricao: string
    public postagem: Postagem[]

}