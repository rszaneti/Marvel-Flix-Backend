interface ITemplateVariablesList {
  title: string;
  description: string;
  modified: Date | null;
  pageCount: number;
  thumbnail: string;
}

interface ITemplateVariables {
  [key: string]: string | number | Array<ITemplateVariablesList>;
}

export default interface IParseMailTemplateDTO {
  file: string;
  fileHeader: string;
  fileBody: string;
  fileFooter: string;
  variables: ITemplateVariables;
}
