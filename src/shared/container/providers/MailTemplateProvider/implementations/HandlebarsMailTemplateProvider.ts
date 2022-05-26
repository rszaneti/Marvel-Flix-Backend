import handlebars from 'handlebars';
import fs from 'fs';

import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    fileHeader,
    fileBody,
    fileFooter,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const templateFileHeader = await fs.promises.readFile(fileHeader, {
      encoding: 'utf-8',
    });

    const templateFileBody = await fs.promises.readFile(fileBody, {
      encoding: 'utf-8',
    });

    const templateFileFooter = await fs.promises.readFile(fileFooter, {
      encoding: 'utf-8',
    });

    handlebars.registerPartial('header', templateFileHeader);
    handlebars.registerPartial('body', templateFileBody);
    handlebars.registerPartial('footer', templateFileFooter);

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
