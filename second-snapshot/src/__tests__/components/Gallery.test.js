import { create } from 'react-test-renderer';
import Gallery from '../../components/Gallery';
import Image from '../../components/Image';
import NoImages from '../../components/NoImages';

let component;

const props = {
  data: []
};

describe('<Gallery />', () => {
  beforeEach(() => {
    component = create(<Gallery {...props} />);
  });

  it('Renderiza correctamente', () => {
    expect(component).toBeDefined();
    expect(component.root.findByType("div"));
    expect(component.root.findByType("ul"));
  });

  it('Muestra NoImages si la data está vacía', () => {
    expect(component.root.findByType(NoImages)).toBeDefined();
  });

  it('Renderiza las imagenes si la data existe o cambia', () => {
    const data = [
      { farm: "farmTest01", server: "serverTest", id: "testId01", secret: "1212312321eaw", title: "titleTest01" },
      { farm: "farmTest02", server: "serverTest", id: "testId02", secret: "sdfdssfdsdf12", title: "titleTest01" },
      { farm: "farmTest03", server: "serverTest", id: "testId03", secret: "3454dfg344355", title: "titleTest01" },
      { farm: "farmTest04", server: "serverTest", id: "testId04", secret: "78987gdfgfddg", title: "titleTest01" },
    ];

    component.update(<Gallery data={data} />);

    expect(component.root.findAllByType(NoImages).length).toEqual(0);
    expect(component.root.findAllByType(Image).length).toEqual(data.length);

    expect(component.root.findAllByType(Image)[0].props.alt).toEqual(data[0].title)
  });
})