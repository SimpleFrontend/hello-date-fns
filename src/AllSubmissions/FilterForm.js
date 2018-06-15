import React from 'react';
import { css } from 'react-emotion';
import { Form, Select, Button, Row, Col } from 'antd';

const { Option } = Select;

const FormClassName = css({
  marginTop: 40,
});

const FullWidthClassName = css({
  width: 'calc(100% - 8px)',
  '.ant-form-item-control-wrapper': { width: 'calc(100% - 8px)' },
});

const FormItemButtonClassName = css({
  width: '100%',
  '.ant-form-item-control-wrapper': {
    width: '100%',
  },
  '.ant-form-item-control-wrapper button.ant-btn': {
    width: '100%',
  },
});

const FormItem = Form.Item;

const stages = {
  1: 'To-Do List',
  2: 'Filter',
};

class FilterForm extends React.Component {
  state = {
    stage: '',
    tag: '',
  };
  componentDidMount() {
    this.props.form.validateFields();
  }
  handleSubmit = e => {
    e.preventDefault();
    const { stage, tag } = this.state;
    this.props.onSubmit({ stage, tag });
  };
  handleChange = key => value => {
    this.setState(state => ({ ...state, [key]: value }));
  };
  render() {
    const { allTags } = this.props;

    return (
      <Form
        layout="inline"
        onSubmit={this.handleSubmit}
        className={FormClassName}
      >
        <Row>
          <Col span={8}>
            <FormItem className={FullWidthClassName}>
              <Select
                showSearch
                placeholder="Select a stage"
                optionFilterProp="children"
                onChange={this.handleChange('stage')}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {Object.entries(stages).map(([key, value]) => (
                  <Option key={key} value={key}>{`${key} - ${value}`}</Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem className={FullWidthClassName}>
              <Select
                showSearch
                placeholder="Select a tag"
                optionFilterProp="children"
                onChange={this.handleChange('tag')}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {allTags.map(tag => (
                  <Option key={tag} value={tag}>
                    {tag}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem className={FormItemButtonClassName}>
              <Button type="primary" htmlType="submit">
                Filter
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const WrappedFilterForm = Form.create()(FilterForm);
export default WrappedFilterForm;
