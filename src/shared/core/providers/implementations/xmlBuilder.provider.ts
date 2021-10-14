import { create } from 'xmlbuilder2';
import { IObjectToXml } from '../objectToXml.interface';

export class XmlBuilderProvider implements IObjectToXml {
  convert(object: any): string {
    return create(object).end({ prettyPrint: true });
  }
}
