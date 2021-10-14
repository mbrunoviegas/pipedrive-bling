import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { Deal } from '../../../../shared/core/domain/Deal';
import { MethodTypeEnum } from '../../../../shared/core/enum/methodType.enum';
import { AxiosProvider } from '../../../../shared/core/providers/implementations/axios.provider';
import { XmlBuilderProvider } from '../../../../shared/core/providers/implementations/xmlBuilder.provider';
import { IObjectToXml } from '../../../../shared/core/providers/objectToXml.interface';
import { IRequestExternalService } from '../../../../shared/core/providers/requestExternalService.interface';
import { IOrderProvider } from '../orderProvider.interface';
import { IRequestOrderPayload, ItemContent } from '../types/blingOrders';

@Injectable()
export class BlingProvider implements IOrderProvider {
  constructor(
    @Inject(AxiosProvider)
    private requestProvider: IRequestExternalService,
    @Inject(XmlBuilderProvider)
    private objectToXmlProvider: IObjectToXml,
  ) {}

  private buildOrderItemContent(payload: Deal[]): ItemContent[] {
    return payload.map((data) => ({
      codigo: uuidV4(),
      descricao: data.title,
      qtde: 1,
      un: 'Un',
      vlr_unit: data.value,
    }));
  }

  private buildCreateOrderRequestXml(payload: Deal[]): string {
    const objectXml = {
      pedido: {
        cliente: {
          name: 'Marcelo',
        },
        itens: {
          item: this.buildOrderItemContent(payload),
        },
      },
    } as IRequestOrderPayload;

    return this.objectToXmlProvider.convert(objectXml);
  }

  async createOrder(payload: Deal[]): Promise<void> {
    const END_POINT = 'pedido/json/';
    const requestXml = this.buildCreateOrderRequestXml(payload);

    const { status, body } = await this.requestProvider.request({
      method: MethodTypeEnum.POST,
      url: `${process.env.BLING_BASE_URL}/${END_POINT}`,
      params: {
        apikey: process.env.BLING_API_KEY,
        xml: requestXml,
      },
    });

    if (status !== 201) {
      throw new Error('Failed to create a new ordem in Bling');
    }
  }

  async listOrders(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
