
import { act, create } from 'react-test-renderer';
import Container from '../../components/Container';
import Gallery from '../../components/Gallery';
// import Loader from '../../components/Loader';
import PhotoContextProvider from '../../context/PhotoContext';
import axios from "axios";

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
    const customData = {
      photos: {
        photo: [
          {
            farm: "farmTest01",
            server: "serverTest",
            id: "testId01", secret: "1212312321eaw",
            title: "titleTest01"
          }
        ]
      }
    };
    // axios.get.mockImplementation(() => Promise.resolve({customData }));
    axios.get(() => Promise.resolve({
      customData
    }));

    await act(async () => {
      await component.update(
        <PhotoContextProvider>
          <Container searchTerm="text" />
        </PhotoContextProvider>);
    });

    // expect(axios.get).toHaveBeenCalled();
    // expect(axios.get).toHaveBeenCalledTimes(3);
    expect(axios.post).not.toHaveBeenCalled();
    expect(axios.put).not.toHaveBeenCalled();
    // expect(component.root.findByType(Gallery).props.data).toEqual(customData.photos.photo);
  });
});