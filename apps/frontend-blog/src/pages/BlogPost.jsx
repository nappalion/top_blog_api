import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import RichTextEditor from "../components/RichTextEditor";

function BlogPost() {
  const location = useLocation();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const post = location.state?.post;

  useEffect(() => {
    if (post.content) {
      try {
        const contentState = convertFromRaw(post.content);
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        console.error("Failed to load editor content:", error);
      }
    }
  }, [post.content]);

  return (
    <div>
      <NavBar />
      <h1>{post.title}</h1>
      <h2>{post.authorId}</h2>
      <h3>{post.createdAt}</h3>
      <RichTextEditor
        editorState={editorState}
        readOnly={true}
        onChange={() => {}}
      />
    </div>
  );
}

export default BlogPost;
