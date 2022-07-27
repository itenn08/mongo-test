export interface PageCategory extends Document {
  readonly name: string;
  readonly link: string;
  readonly parent: string;
  readonly order: number;
}
