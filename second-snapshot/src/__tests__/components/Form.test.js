import { act, create } from 'react-test-renderer';
import Form from '../../components/Form';

let component;
const props = {
  history: {},
  handleSubmit: jest.fn(),
};

describe('<Form />', () => {
  beforeEach(() => {
    component = create(<Form {...props} />);
  });

  it('Renderiza correctamente', () => {
    expect(component).toBeDefined();
    expect(component.toJSON().type).toEqual('form');

    const form = component.root.findByType("form");
    expect(form.findByType('input')).toBeDefined();
    expect(form.findByType('button')).toBeDefined();
    expect(form.findByType('svg')).toBeDefined();
  });

  it('El botón debe habilitarse si el input tiene un valor no vacío', () => {
    const form = component.root.findByType("form");
    const input = form.findByType("input");
    const button = form.findByType("button");

    expect(button.props.disabled).toBeTruthy();
    expect(button.props.className).toEqual("search-button null");

    act(() => {
      input.props.onChange({ target: { value: "aves" } });
    });

    expect(button.props.disabled).toBeFalsy();
    expect(button.props.className).toEqual("search-button active");
  });

  it('Se debe de llamar al onSubmit sin problemas', () => {
    const form = component.root.findByType("form");
    form.props.onSubmit();

    expect(props.handleSubmit).toHaveBeenCalled();
    expect(props.handleSubmit).toHaveBeenCalledTimes(1);
    expect(props.handleSubmit).toHaveBeenCalledWith(undefined, props.history, "");
  });
});