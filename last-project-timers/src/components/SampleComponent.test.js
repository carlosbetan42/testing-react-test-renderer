import { act, create } from 'react-test-renderer';
import SampleComponent from './SampleComponent';

let component;

describe('<SampleComponent />', () => {
  beforeEach(() => {
    jest.useFakeTimers();

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve([])
    }));

    window.Storage.prototype.setItem = jest.fn();

    component = create(<SampleComponent />);
  });

  it('Renderiza correctamente', async () => {
    expect(component.root).toBeDefined();
    expect(await component.root.findByType("h4")).toBeDefined();
  });

  it('Llama a la API con fetch', async () => {
    expect(window.fetch).not.toHaveBeenCalled();

    await act(async () => {
      await jest.runAllTimers();
    });

    expect(window.fetch).toHaveBeenCalled();
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect((await component.root.findAllByType("p")).length).toEqual(0);

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve([{
        id: 1, name: 'Juar Ortiz'
      }, {
        id: 2, name: 'Otro'
      }])
    }));

    await component.update(<SampleComponent />);

    await act(async () => {
      await jest.runAllTimers();
    });

    expect((await component.root.findAllByType("p")).length).toEqual(2);
    expect(window.fetch).toHaveBeenCalled();
    expect(window.fetch).toHaveBeenCalledTimes(2);
  });

  it('Guarda el resultado en localstorage', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve([{
        id: 1, name: 'Juar Ortiz'
      }, {
        id: 2, name: 'Otro'
      }])
    }));

    await component.update(<SampleComponent />);

    await act(async () => {
      await jest.runAllTimers();
    });

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith("users", JSON.stringify([{
      id: 1, name: 'Juar Ortiz'
    }, {
      id: 2, name: 'Otro'
    }]));
  });

  afterAll(() => {
    window.fetch.mockReset();
    window.Storage.prototype.setItem.mockReset();
  });
});