import { XmlBuilderProvider } from 'src/shared/core/providers/implementations/xmlBuilder.provider';

describe('XML Builder Test', () => {
  const xmlBuilderProvider = new XmlBuilderProvider();

  test('Should generate a xml string', () => {
    const pedido = {
      pedido: {
        cliente: {
          nome: 'Marcelo',
        },
        itens: {
          item: [
            {
              codigo: '001',
              descricao: 'Teste',
              un: 'Un',
              qtde: 1,
              vlr_unit: 100,
            },
            {
              codigo: '001',
              descricao: 'Teste',
              un: 'Un',
              qtde: 1,
              vlr_unit: 100,
            },
          ],
        },
      },
    };

    const xml = xmlBuilderProvider.convert(pedido);

    expect(xml).toContain('<pedido>');
    expect(xml).toContain('</pedido>');
    expect(xml).toContain('<cliente>');
    expect(xml).toContain('</cliente>');
    expect(xml).toContain('<itens>');
    expect(xml).toContain('</itens>');
    expect(xml).toContain('<item>');
    expect(xml).toContain('</item>');
    expect(xml).toContain('<codigo>');
    expect(xml).toContain('</codigo>');
    expect(xml).toContain('<descricao>');
    expect(xml).toContain('</descricao>');
    expect(xml).toContain('<un>');
    expect(xml).toContain('</un>');
    expect(xml).toContain('<qtde>');
    expect(xml).toContain('</qtde>');
    expect(xml).toContain('<vlr_unit>');
    expect(xml).toContain('</vlr_unit>');
  });
});
