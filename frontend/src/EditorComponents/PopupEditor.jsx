import { useCallback, useState } from "react";
import classNames from "classnames";
import ImageExtended from "./ImageExtended.jsx";

import { Video } from "./VideoEmbed.js";
import { storage } from "./firebase.js";
import { TextAlign } from "@tiptap/extension-text-align";

//import Youtube from "@tiptap/extension-youtube";
import Youtube from "./youtube/index.js";
import Heading from "@tiptap/extension-heading";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEditor, EditorContent, Editor, BubbleMenu } from "@tiptap/react";
import CustomKeymap from "./custom-keymap.js";
import DragAndDrop from "./drag-and-drop.jsx";

import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

import Placeholder from "@tiptap/extension-placeholder";
import "./styles.css";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import { SlashCommand } from "./SlashCommand.jsx";
import content from "./content.js";
import * as Icons from "./Icons.jsx";
import { LinkModal } from "./LinkModal.jsx";
const Title = Heading.extend({
  name: "title",
  group: "title",
  parseHTML: () => [{ tag: "h1:first-child" }],
}).configure({ levels: [1] });

const DocumentWithTitle = Document.extend({
  content: "title block+",
});

export function PopupEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        dropcursor: {
          color: "#DBEAFE",
          width: 4,
        },
      }),
      Underline,
      Title,
      DocumentWithTitle,
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
        alignments: ["left", "center", "right", "justify"],
      }),

      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        // Not sure what the type of node is, so I'm using any
        placeholder: ({ node }) => {
          if (node.type.name === "title") {
            return "What's the title?";
          }
          if (node.type.name === "heading") {
            return `Heading ${node.attrs.level}`;
          }
          return "Press '/' for commands, or enter some text...";
        },
        includeChildren: true,
      }),
      SlashCommand,

      Image,
      ImageExtended,
      CustomKeymap,
      DragAndDrop,
      Video,
      Youtube.configure({
        inline: false,
        HTMLAttributes: {
          class: "ytvariable",
        },
      }),
    ],
    content,
  });

  const [modalIsOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");

  let blobImages = [];
  let FirebaseArray = [];

  const handleImageUpload = useCallback(() => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.addEventListener("change", (e) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        const imageUrl = URL.createObjectURL(selectedFile);
        if (imageUrl) {
          editor.chain().focus().setImage({ src: imageUrl }).run(); // Insert the selected image
        }
      }
    });
    fileInput.click();
  }, [editor]);
  const replaceBlobImages = async () => {
    if (editor && blobImages.length > 0) {
      const tr = editor.state.tr;

      for (let index = 0; index < blobImages.length; index++) {
        const imageSrc = blobImages[index];
        const images = editor.view.dom.querySelectorAll("img");

        for (let i = 0; i < images.length; i++) {
          const imgNode = images[i];
          if (imgNode.src === imageSrc) {
            const nodePos = editor.view.posAtDOM(imgNode, -1); // Get node position
            const node = editor.state.doc.nodeAt(nodePos); // Get the node

            // Update the node attributes to change the src, width, and height
            tr.setNodeMarkup(nodePos, null, {
              src: FirebaseArray[index].src,
            });
          }
        }
      }

      editor.view.dispatch(tr);
      FirebaseArray = []; // Clear the FirebaseArray
      blobImages = []; // Clear the blobImages array
      console.log("Images replaced with Firebase URLs");
    }
  };

  const uploadBlobImagesToFirebase = async () => {
    if (editor) {
      editor.view.dom.querySelectorAll("img").forEach((imgNode) => {
        const imageSrc = imgNode.currentSrc;

        // Check if the image source is a blob URL
        if (imageSrc.startsWith("blob:")) {
          blobImages.push(imageSrc);
        }
      });
    }

    const uploadPromises = blobImages.map(async (blobImageUrl) => {
      const selectedFile = await fetch(blobImageUrl).then((response) =>
        response.blob()
      );

      try {
        const date = new Date().getTime();
        const storageRef = ref(storage, `images/${date}_${selectedFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
        await uploadTask;
        const downloadURL = await getDownloadURL(storageRef);

        FirebaseArray.push({ src: downloadURL }); // Push Firebase URL to FirebaseArray
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    });

    await Promise.all(uploadPromises); // Wait for all uploads to complete
    console.log("Blob images uploaded to Firebase");
  };

  const handleLogContent = async () => {
    await handleButtonClick();
    if (editor) {
      const editorContent = editor.getHTML(); // Get the HTML content of the editor
      console.log(editorContent);
    }
  };
  const handleSelectedGif = (gifUrl) => {
    // You can use the selected GIF URL in App.tsx as needed
    editor.chain().focus().setImage({ src: gifUrl }).run();
  };

  const openModal = useCallback(() => {
    console.log(editor.chain().focus());
    setUrl(editor.getAttributes("link").href);
    setIsOpen(true);
  }, [editor]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setUrl("");
  }, []);

  const saveLink = useCallback(() => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank" })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    closeModal();
  }, [editor, url, closeModal]);

  const removeLink = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    closeModal();
  }, [editor, closeModal]);

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run();
  }, [editor]);
  const addYoutubeVideo = useCallback(async () => {
    const url = prompt("Enter YouTube URL");

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("youtube").clearContent().run();
      return;
    }
    try {
      console.log(url);
      const sourceUrl = async () => {
        try {
          //const result = await getSourceUrl(url);
          return; // result;
        } catch (error) {
          console.error("Error fetching source URL:", error.message);
          throw error;
        }
      }; // Call getSourceUrl to extract the source URL
      sourceUrl()
        .then((url) => {
          editor.commands.setYoutubeVideo({
            src: url, // Pass the extracted source URL to setYoutubeVideo
            width: 320,
            height: 180,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error fetching source URL:", error.message);
      // Handle the error as needed (e.g., show an error message to the user)
    }
  }, [editor]);
  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run();
  }, [editor]);

  const toggleCode = useCallback(() => {
    editor.chain().focus().toggleCode().run();
  }, [editor]);
  const handleButtonClick = async () => {
    await uploadBlobImagesToFirebase();
    // Wait for images to be uploaded before replacing
    replaceBlobImages();
  };

  const isActive = (options) => {
    return editor.isActive("custom-image", options);
  };

  const setImage = (options) => {
    editor.chain().focus().setImage(options).run();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="editor editor-mini">
      <BubbleMenu
        pluginKey="bubbleMenuText"
        className="bubble-menu-dark"
        tippyOptions={{ duration: 150 }}
        editor={editor}
        shouldShow={({ editor, view, state, oldState, from, to }) => {
          // only show if range is selected.
          return from !== to && !editor.isActive("custom-image");
        }}
      >
        <button
          className="menu-button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Icons.RotateLeft />
        </button>
        <button
          className="menu-button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Icons.RotateRight />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("link"),
          })}
          onClick={openModal}
        >
          <Icons.Link />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("bold"),
          })}
          onClick={toggleBold}
        >
          <Icons.Bold />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("underline"),
          })}
          onClick={toggleUnderline}
        >
          <Icons.Underline />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("intalic"),
          })}
          onClick={toggleItalic}
        >
          <Icons.Italic />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("strike"),
          })}
          onClick={toggleStrike}
        >
          <Icons.Strikethrough />
        </button>
        <button
          className={classNames("menu-button", {
            "is-active": editor.isActive("code"),
          })}
          onClick={toggleCode}
        >
          <Icons.Code />
        </button>
      </BubbleMenu>
      <BubbleMenu
        className="bubble-menu-dark"
        tippyOptions={{ duration: 150 }}
        editor={editor}
        shouldShow={({ editor, view, state, oldState, from, to }) => {
          // only show the bubble menu for images and links
          return (
            editor.isActive("custom-image") ||
            editor.isActive("custom-image-small") ||
            editor.isActive("custom-image-large") ||
            editor.isActive("custom-image-medium")
          );
        }}
      >
        <button
          className={`button ${
            isActive({ size: "medium" }) ? "is-active" : ""
          }`}
          onClick={() => setImage({ size: "medium" })}
        >
          Medium
        </button>
        <button
          className={`button ${isActive({ size: "small" }) ? "is-active" : ""}`}
          onClick={() => setImage({ size: "small" })}
        >
          Small
        </button>
        <button
          className={`button ${isActive({ size: "large" }) ? "is-active" : ""}`}
          onClick={() => setImage({ size: "large" })}
        >
          Large
        </button>

        <button
          className={`button ${isActive({ float: "left" }) ? "is-active" : ""}`}
          onClick={() => setImage({ float: "left" })}
        >
          Left
        </button>
        <button
          className={`button ${isActive({ float: "none" }) ? "is-active" : ""}`}
          onClick={() => setImage({ float: "none" })}
        >
          No Float
        </button>
        <button
          className={`button ${
            isActive({ float: "right" }) ? "is-active" : ""
          }`}
          onClick={() => setImage({ float: "right" })}
        >
          Right
        </button>
      </BubbleMenu>
      <div
        onClick={() => {
          editor?.chain().focus().run();
        }}
      >
        {editor && <BubbleMenu editor={editor} />}
        {editor?.isActive("image")}
        <EditorContent editor={editor} />
      </div>

      <BubbleMenu
        pluginKey="bubbleMenuLink"
        className="bubble-menu-dark"
        tippyOptions={{ duration: 150 }}
        editor={editor}
        shouldShow={({ editor, view, state, oldState, from, to }) => {
          // only show the bubble menu for links.
          return from === to && editor.isActive("link");
        }}
      >
        <button className="button" onClick={openModal}>
          Edit
        </button>
        <button className="button-remove" onClick={removeLink}>
          Remove
        </button>
      </BubbleMenu>

      <EditorContent editor={editor} />

      <LinkModal
        url={url}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Link Modal"
        closeModal={closeModal}
        onChangeUrl={(e) => setUrl(e.target.value)}
        onSaveLink={saveLink}
        onRemoveLink={removeLink}
      />
      <button className="button" onClick={handleLogContent}>
        <Icons.Publish />
        <h4>Publish</h4>
      </button>
    </div>
  );
}
