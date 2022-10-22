
import { act, create } from 'react-test-renderer';
import Container from '../../components/Container';
import Gallery from '../../components/Gallery';
import Loader from '../../components/Loader';
import PhotoContextProvider from '../../context/PhotoContext';

let component;

describe('<Container />', () => {
  beforeEach(async () => {
    await act(async () => {
      component = await create(
        <PhotoContextProvider>
          <Container searchTerm="" />
        </PhotoContextProvider >);
    });
  });

  it('Renderiza completamente', () => {
    expect(component.root).toBeDefined();
    expect(component.root.findByType(Container)).toBeDefined();
    // expect(component.root.findByType(Loader)).toBeDefined();
    expect(component.root.findAllByType(Gallery).length).toEqual(1);
  });

  it('Llama a la API si es necesario o cambia el texto', async () => {
    await act(async () => {
      await component.update(
        <PhotoContextProvider>
          <Container searchTerm="text" />
        </PhotoContextProvider>);
    });
  });
});