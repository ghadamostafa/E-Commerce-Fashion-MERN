import React,{useContext} from "react";
import "antd/dist/antd.css";
import {
  Table,
  Button,
  Tag,
  Popconfirm,
  Modal,
  Form,
  Input,
  message,
  Select,
} from "antd";
import axios from "axios";
const { Option } = Select;
class ProductsControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      categories: [],
      clickedRecord: {},
      tags: [],
      dataSource: [],
      count: 0,
      action: "",
    };
    this.columns = [
      {
        title: "name",
        dataIndex: "name",
      },
      {
        title: "quantity",
        dataIndex: "quantity",
      },
      {
        title: "description",
        dataIndex: "description",
      },
      {
        title: "price",
        dataIndex: "price",
      },
      {
        title: "slug",
        dataIndex: "slug",
      },
      {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: (tags) => (
          <>
            {tags.map((tag) => {
              return <Tag key={tag}>{tag}</Tag>;
            })}
          </>
        ),
      },
      {
        title: "category",
        dataIndex: "category",
      },
      {
        title: "operation",
        dataIndex: "operation",
        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <>
              <Popconfirm
                className="mr-2 "
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.key)}
              >
                <Button type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>

              <Button
                type="primary"
                onClick={() => this.showUpdateModal(record)}
              >
                Update
              </Button>
            </>
          ) : null,
      },
    ];
  }
  componentDidMount() {

      
    //fetch products from api
    const fetchProducts = async () => {
      const { data: products } = await axios.get("/admin/products");
      //set table with products
      const dataSource = products.data.map((item) => {
        const tags = item.tags.map(({ slug }) => slug);
        return {
          ...item,
          key: item.slug,
          category: item.category.slug,
          tags: tags,
        };
      });
      this.setState({ ...this.state, dataSource });
    };
    //fetch categories from api
    const fetchCategories = async () => {
      const { data } = await axios.get("/admin/categories");
      const categories = data.data;
      this.setState({ ...this.state, categories });
    };
    //fetch tags from api
    const fetchTags = async () => {
      const { data } = await axios.get("/tags");
      console.log(data.data);
      const tags = data.data;
      this.setState({ ...this.state, tags });
    };
    const user=sessionStorage.getItem('user');
    console.log(user);
    if (user && user.role=="admin") {
      fetchProducts();
      fetchCategories();
      fetchTags();
      console.log('logged in');
    } else {
      console.log('not logged in');
      this.props.history.push('/login')
    }
   
  }
  //show update modal
  showUpdateModal = async (record) => {
    const { data: result } = await axios.get(`/products/${record.slug}`);
    record.category = result.data.category._id;
    record.tags = result.data.tags.map(({ _id }) => _id);
    this.setState({
      ...this.state,
      visible: true,
      clickedRecord: record,
      action: "update",
    });
  };
  //delete product handler
  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    const deleteProduct = async () => {
      try {
        const { data: result } = await axios.delete(`/admin/products/${key}`);
        if (result.success) {
          this.setState({
            dataSource: dataSource.filter((item) => item.key !== key),
          });
        }
      } catch (error) {
        console.log(error);
      }
      message.success("Product deleted successfully");
    };
    deleteProduct();
  };
  //close model handler
  handleCancel = () => {
    this.setState({ ...this.state, visible: false });
  };
  showCreateModal = () => {
    this.setState({ ...this.state, visible: true, action: "create" });
  };
  handleStore = async (values) => {
    const { data } = await axios.post(`/admin/products`, values);
    const newRecord = data.data;
    const tags = newRecord.tags.map(({ slug }) => slug);
    const category = newRecord.category.slug;
    const newProduct = { ...newRecord, tags, category, key: newRecord.slug };
    console.log(newRecord);
    this.setState({
      ...this.state,
      dataSource: [...this.state.dataSource, newProduct],
      visible: false,
    });
    message.success("Product added successfully");
  };
  //update product handler
  handleUpdate = async (values) => {
    const { data } = await axios.put(`/admin/products/${values.key}`, values);
    const newDataSource = this.convertDataToShow(data.data);
    this.setState({ ...this.state, visible: false, dataSource: newDataSource });

    message.success("Product updated successfully");
  };
  extractDataToShow = async (updatedRecord) => {
    const tags = updatedRecord.tags.map(({ slug }) => slug);
    const newDataSource = this.state.dataSource.map((item) => {
      return item.key === this.state.clickedRecord.key
        ? { ...updatedRecord, tags, category: updatedRecord.category.slug }
        : item;
    });
    return newDataSource;
  };
  render() {
    const { dataSource } = this.state;
    return (
      <div className="m-5">
        <Button
          onClick={this.showCreateModal}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Add a Product
        </Button>
        <Table bordered dataSource={dataSource} columns={this.columns} />
        <Modal
          title="Update Product"
          visible={this.state.visible}
          footer={null}
          width="30%"
          onCancel={this.handleCancel}
        >
          <Form
            onFinish={
              this.state.action === "update"
                ? this.handleUpdate
                : this.handleStore
            }
            initialValues={
              this.state.action === "update" ? this.state.clickedRecord : {}
            }
          >
            <Form.Item name="key" hidden="true">
              <Input />
            </Form.Item>
            <Form.Item
              name="name"
              label="Product Name"
              rules={[
                {
                  required: true,
                  message: "Please input product name!",
                },
              ]}
            >
              <Input placeholder="Product Name" />
            </Form.Item>
            <Form.Item
              name="price"
              label="Product Price"
              rules={[
                {
                  required: true,
                  message: "Please input product price",
                },
              ]}
            >
              <Input type="text" placeholder="Price" />
            </Form.Item>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[
                {
                  required: true,
                  message: "Please input product quantity!",
                },
              ]}
            >
              <Input placeholder="Product Quanatity" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please input product description",
                },
              ]}
            >
              <Input type="text" placeholder="Description" />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[
                {
                  required: true,
                  message: "Please select product category",
                },
              ]}
            >
              <Select>
                {this.state.categories ? (
                  this.state.categories.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  ))
                ) : (
                  <Option value="disabled" disabled>
                    No Categories
                  </Option>
                )}
              </Select>
            </Form.Item>
            <Form.Item
              name="tags"
              label="Tags"
              rules={[
                {
                  required: true,
                  message: "Please select product tags",
                },
              ]}
            >
              <Select
                mode="tags"
                // size={size}
                placeholder="Please select Tags"
                style={{ width: "100%" }}
              >
                {this.state.tags
                  ? this.state.tags.map((tag) => (
                      <Option key={tag._id}>{tag.name}</Option>
                    ))
                  : ""}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" color="dark">
                {this.state.action === "update" ? "Update" : "Create"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default ProductsControl;
