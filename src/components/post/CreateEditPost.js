import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
} from "reactstrap";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { addPost, getPostById } from "../../helper/api";
import useSweetAlert from "../../customhooks/useSweetAlert";
import { useParams } from "react-router-dom";

const CreateEditPost = () => {
  const { post_id } = useParams();
  const { showAlert } = useSweetAlert();
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleContentChange = (content) => {
    setContent(content);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleSubmit = async (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    e.preventDefault();
    const formData = {
      user_id: user?._id,
      post_content: content,
      tags,
    };

    if (post_id) {
      try {
        addPost(formData).then(async (res) => {
          console.log(res.data);
          await showAlert({
            title: "success",
            text: res.data.message,
            icon: "success",
            onConfirm: () => {
              window.location.href = "/";
            },
            //   onCancel: handleCancelClick,
          });
        });
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  };

  useEffect(() => {
    if (post_id) {
      getPostById(post_id).then((res) => {
        setContent(res.data.post_content);
        setTags(res.data.tags);
      });
    }
  }, []);
  return (
    <Container className="create-edit- mt-2">
      <h2>{!post_id ? "Create" : "Edit"} Post</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="tags">Tags (comma-separated)</Label>
          <Input
            type="text"
            name="tags"
            id="tags"
            value={tags}
            onChange={handleTagsChange}
            placeholder="e.g. trending, viral"
          />
        </FormGroup>
        <FormGroup>
          <Label for="content">Content</Label>
          <SunEditor
            height="300px"
            setContents={content}
            onChange={handleContentChange}
            placeholder="What are your thoughts !"
            setOptions={{
              buttonList: [
                ["undo", "redo"],
                ["font", "fontSize", "formatBlock"],
                [
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                ],
                ["removeFormat"],
                "/", // Line break
                ["outdent", "indent"],
                ["align", "horizontalRule", "list", "table"],
                // ["link", "image", "video"],
                ["link", "video"],
                ["fullScreen", "showBlocks", "codeView"],
                ["preview", "print"],
                ["save", "template"],
              ],
            }}
          />
        </FormGroup>

        <Row>
          <Col xs={12} className="d-flex justify-content-end">
            <Button color="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CreateEditPost;
