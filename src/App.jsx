import { createContext, useContext, useEffect, useRef, useState } from 'react'
import './App.css'

const RouterContext = createContext(null);
const PostContext = createContext(null);

const routes = [
  {
    id: crypto.randomUUID(),
    name: 'Home',
    url: '#/',
    element: <Home />,
  },
  {
    id: crypto.randomUUID(),
    name: 'About',
    url: '#/about',
    element: <About />,
  },
  {
    id: crypto.randomUUID(),
    name: 'Posts',
    url: '#/posts',
    element: <Posts />,
  },
  {
    id: crypto.randomUUID(),
    name: 'Contact',
    url: '#/contact',
    element: <Contact />,
  },
];

const notFound = {
  name: 'Page not found',
  element: <NotFound />,
  // url: '',
}

function getRoute(routeUrl) {
  const route = routes.find(x => x.url === routeUrl);
  return route ?? notFound;
}

const title = "App";

function setTitle(pageTitle) {
  document.title = `${pageTitle} - ${title}`;
}

function App() {
  // const [route, setRoute] = useState(location.hash.length < 2 ? '#/' : location.hash);
  // const [route, setRoute] = useState(location.hash.length < 2 ? routes[0] : getRoute(location.hash));
  const [route, setRoute] = useState(
    () => {
      if (location.hash.length < 2) {
        return routes[0];
      }

      return getRoute(location.hash);
    }
  );

  useEffect(() => {
    setTitle(route.name);
  }, [route]);

  useEffect(() => {
    window.addEventListener('hashchange', function () {
      setRoute(getRoute(location.hash));
    });
  }, []);

  return (
    <div className="container">
      <RouterContext.Provider value={route}>
        {location.hash !== '#/' ? <Header /> : ''}
        <Main />
        <Footer />
      </RouterContext.Provider>
    </div>
  )
}

function Main() {
  const [postId, setPostId] = useState(null);
  const dialogRef = useRef({});
  function handleClick() {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }

  return (
    <div className="main">
      <PostContext.Provider value={{ postId, setPostId, dialogRef, handleClick }}>
        <Content />
        <Sidebar />
      </PostContext.Provider>
    </div>
  )
}

function Header() {
  return (
    <div className="header">
      <a href="#/" className='logo' > App</a>
      <Nav />
    </div>
  )
}

function Nav() {
  const route = useContext(RouterContext);

  return (
    <ul className="nav">
      {routes.map(x =>
        <li key={x.id}>
          <a href={x.url} className={route.url === x.url ? 'selected' : ''}>{x.name}</a>
        </li>)}
    </ul>
  )
}

function Content() {
  const route = useContext(RouterContext);

  return (
    <div className="content">
      {route.element}
    </div>
  )
}

function Footer() {
  return (
    <div className="footer">Kemal Özalp &copy; 2024</div>
  )
}

function Sidebar() {
  const { dialogRef } = useContext(PostContext);

  console.log(location.hash)
  return (
    <div className="sidebar" style={{ display: `${location.hash === "#/posts" ? "block" : "none"}` }}>

      <dialog ref={(e) => (dialogRef.current = e)}>
        <hr />
        <div className="dialogContainer">
          <PostDetail />
        </div>
      </dialog>
    </div>
  )
}

function Home() {
  return (
    <div className="home">
      <h1>HOME <svg className='star' xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 395.38 220.66">
        <g>
          <g id="Layer_1">
            <g>
              <circle class="cls-1" cx="197.22" cy="110.52" r="30.53" />
              <ellipse class="cls-1" cx="197.22" cy="76.43" rx="19.46" ry="24.78" />
              <ellipse class="cls-1" cx="227.76" cy="94.03" rx="24.78" ry="19.46" transform="translate(-9.39 160.94) rotate(-38.19)" />
              <ellipse class="cls-1" cx="168.3" cy="127.41" rx="24.78" ry="19.46" transform="translate(-42.75 131.32) rotate(-38.19)" />
              <ellipse class="cls-1" cx="168.3" cy="93.92" rx="19.46" ry="24.78" transform="translate(2.81 192.71) rotate(-60)" />
              <ellipse class="cls-1" cx="226.26" cy="127.39" rx="19.46" ry="24.78" transform="translate(2.81 259.64) rotate(-60)" />
              <ellipse class="cls-1" cx="197.22" cy="144.24" rx="19.46" ry="24.78" />
            </g>
          </g>
        </g>
      </svg></h1>
      <a href="#/contact" className="contact">
        <svg className='star' xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 395.38 220.66">
          <g>
            <g id="Layer_1">
              <g>
                <circle class="cls-1" cx="197.22" cy="110.52" r="30.53" />
                <ellipse class="cls-1" cx="197.22" cy="76.43" rx="19.46" ry="24.78" />
                <ellipse class="cls-1" cx="227.76" cy="94.03" rx="24.78" ry="19.46" transform="translate(-9.39 160.94) rotate(-38.19)" />
                <ellipse class="cls-1" cx="168.3" cy="127.41" rx="24.78" ry="19.46" transform="translate(-42.75 131.32) rotate(-38.19)" />
                <ellipse class="cls-1" cx="168.3" cy="93.92" rx="19.46" ry="24.78" transform="translate(2.81 192.71) rotate(-60)" />
                <ellipse class="cls-1" cx="226.26" cy="127.39" rx="19.46" ry="24.78" transform="translate(2.81 259.64) rotate(-60)" />
                <ellipse class="cls-1" cx="197.22" cy="144.24" rx="19.46" ry="24.78" />
              </g>
            </g>
          </g>
        </svg>
        <h1>CONTACT</h1>
      </a>
      <a href="#/posts" className="posts">
        <svg className='star' xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 395.38 220.66">
          <g>
            <g id="Layer_1">
              <g>
                <circle class="cls-1" cx="197.22" cy="110.52" r="30.53" />
                <ellipse class="cls-1" cx="197.22" cy="76.43" rx="19.46" ry="24.78" />
                <ellipse class="cls-1" cx="227.76" cy="94.03" rx="24.78" ry="19.46" transform="translate(-9.39 160.94) rotate(-38.19)" />
                <ellipse class="cls-1" cx="168.3" cy="127.41" rx="24.78" ry="19.46" transform="translate(-42.75 131.32) rotate(-38.19)" />
                <ellipse class="cls-1" cx="168.3" cy="93.92" rx="19.46" ry="24.78" transform="translate(2.81 192.71) rotate(-60)" />
                <ellipse class="cls-1" cx="226.26" cy="127.39" rx="19.46" ry="24.78" transform="translate(2.81 259.64) rotate(-60)" />
                <ellipse class="cls-1" cx="197.22" cy="144.24" rx="19.46" ry="24.78" />
              </g>
            </g>
          </g>
        </svg>
        <h1>POSTS</h1>
      </a>
      <a href='#/about' className="about">
        <svg className='star' xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 395.38 220.66">
          <g>
            <g id="Layer_1">
              <g>
                <circle class="cls-1" cx="197.22" cy="110.52" r="30.53" />
                <ellipse class="cls-1" cx="197.22" cy="76.43" rx="19.46" ry="24.78" />
                <ellipse class="cls-1" cx="227.76" cy="94.03" rx="24.78" ry="19.46" transform="translate(-9.39 160.94) rotate(-38.19)" />
                <ellipse class="cls-1" cx="168.3" cy="127.41" rx="24.78" ry="19.46" transform="translate(-42.75 131.32) rotate(-38.19)" />
                <ellipse class="cls-1" cx="168.3" cy="93.92" rx="19.46" ry="24.78" transform="translate(2.81 192.71) rotate(-60)" />
                <ellipse class="cls-1" cx="226.26" cy="127.39" rx="19.46" ry="24.78" transform="translate(2.81 259.64) rotate(-60)" />
                <ellipse class="cls-1" cx="197.22" cy="144.24" rx="19.46" ry="24.78" />
              </g>
            </g>
          </g>
        </svg>
        <h1>ABOUT</h1>
      </a>
    </div>
  );
}

function About() {
  return (
    <>
      <div className="aboutMe">
        <div className="aboutItem">
          <div className="aboutText">
            <h1>ABOUT</h1>
            <h2>Welcome to our platform</h2>
            <p> Where you can explore a diverse range of posts covering topics from various fields. Our mission is to provide users with insightful and well-crafted content, enabling them to stay informed, inspired, and engaged. With regular updates and fresh perspectives, we aim to be a go-to resource for knowledge and inspiration.

              Our clean design and user-focused functionality ensure that navigating through posts is effortless, allowing you to focus on the content that matters most. Whether you’re here to learn, discover, or just enjoy quality reads, we’ve got you covered.</p>
          </div>
        </div>
        <div className="aboutPng">
          <img src="./images/about2.png" alt="" />
        </div>
      </div>
    </>
  );
}

function Contact() {
  return (
    <div className="contact">
      <div className="contactText">
        <h1>CONTACT</h1>
      </div>
      <div className="contactSvg">
        <img src="./images/contact.svg" alt="" />
      </div>
    </div>
  );
}

function Posts() {
  return (
    <>
      <PostList />
    </>
  )
}

function PostList() {
  const { setPostId, handleClick } = useContext(PostContext);
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(6);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);


  useEffect(() => {
    const skip = (page - 1) * limit;

    fetch('https://dummyjson.com/posts?limit=' + limit + "&skip=" + skip)
      .then(r => r.json())
      .then(r => {
        setPosts(r.posts);
        setTotal(r.total);
      });
  }, [limit, page]);

  function changePage(pageNumber) {
    setPage(pageNumber);
  }

  const pageCount = Math.ceil(total / limit);

  function PageLimit(e) {
    setLimit(e.target.value);
  }


  console.log(total)
  return (
    <div className='postContainer'>

      <div className="posthead">
        <h1><svg fill="#6F6F6F" viewBox="0 0 32 32" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Layer1"> <path d="M16,6l-13,0c-0.552,0 -1,0.448 -1,1l0,22c0,0.552 0.448,1 1,1l22,0c0.552,0 1,-0.448 1,-1l0,-13c0,-0.552 -0.448,-1 -1,-1c-0.552,-0 -1,0.448 -1,1l0,12c0,0 -20,0 -20,0c0,0 0,-20 0,-20c-0,0 12,0 12,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1Zm-9,19l14,-0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1l-14,0c-0.552,0 -1,0.448 -1,1c0,0.552 0.448,1 1,1Zm-0,-4l4,0c0.552,-0 1,-0.448 1,-1c-0,-0.552 -0.448,-1 -1,-1l-4,0c-0.552,-0 -1,0.448 -1,1c-0,0.552 0.448,1 1,1Zm22.707,-13.293c0.391,-0.39 0.391,-1.024 0,-1.414l-4,-4c-0.39,-0.391 -1.024,-0.391 -1.414,-0l-10,10c-0.14,0.139 -0.235,0.317 -0.274,0.511l-1,5c-0.065,0.328 0.037,0.667 0.274,0.903c0.236,0.237 0.575,0.339 0.903,0.274l5,-1c0.194,-0.039 0.372,-0.134 0.511,-0.274l10,-10Zm-22.707,9.293l4,0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1l-4,0c-0.552,0 -1,0.448 -1,1c0,0.552 0.448,1 1,1Zm0,-4l5,-0c0.552,0 1,-0.448 1,-1c0,-0.552 -0.448,-1 -1,-1l-5,-0c-0.552,0 -1,0.448 -1,1c0,0.552 0.448,1 1,1Z"></path> </g> </g></svg>POSTS</h1>
        <select onClick={PageLimit}>
          <option value="6" >6</option>
          <option value="12" >12</option>
          <option value="24" >24</option>
        </select></div>

      <div className="postList">
        {posts.map(x =>
          <div key={x.id} className='postItem'>
            <div className="postText">
              <h2>{x.title} </h2>
              <h5>{x.body}</h5>
            </div>
            <div className="postetiket">
              <a
                href={'#/posts/' + x.id}
                onClick={e => { e.preventDefault(); setPostId(x.id); handleClick(); }}
              >See Comment</a>
            </div>
          </div>
        )}
      </div>
      <ul className="BtnList">
        {
          Array
            .from({ length: pageCount }, (v, i) => (i + 1))
            .map(x => <li key={x}><a href="#" className={page === x ? 'activePage' : ''} onClick={e => { e.preventDefault(); changePage(x); }}>{x}</a></li>)
        }
      </ul>
    </div>
  )
}

function PostDetail() {
  const { setPostId, postId } = useContext(PostContext);
  const [comments, setComments] = useState(localStorage.comments ? JSON.parse(localStorage.comments) : []);

  const [Newcomments, setNewComments] = useState(localStorage.Newcomments ? JSON.parse(localStorage.Newcomments) : []);

  console.log(postId)
  async function getData() {
    const commentsData = await fetch(`https://dummyjson.com/posts/${postId}/comments`).then(r => r.json());

    setComments(commentsData.comments);
  }
  console.log(comments)

  function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let formObj = Object.fromEntries(formData);
    setNewComments([...Newcomments, {
      id: crypto.randomUUID(),
      postId: postId,
      body: formObj.body,
      user: {
        fullName: formObj.fullName
      }
    }]);
    e.target.reset();
    dialogRef.current.close();
  }

  useEffect(() => {
    localStorage.comments = JSON.stringify(comments);
    localStorage.Newcomments = JSON.stringify(Newcomments);
  }, [comments, Newcomments]);

  useEffect(() => {
    if (postId !== null) {
      getData();
    }
  }, [postId]);



  return (
    <>
      <h2 style={{ textAlign: "center" }}>Comments</h2>
      <hr />


      {comments.length !== 0 ? <>
        {comments.map(
          x => <p key={x.id} className='commentItem'><strong>{x.user.fullName}</strong> : {x.body}</p>
        )}
        {Newcomments.map(
          x => <p key={x.id} className='commentItem' style={{
            display: `${x.postId === comments[0].postId ? "block" : "none"}`
          }}><strong>{x.user.fullName}</strong> : {x.body}</p>
        )}
      </> : <h4>Yorum Yok</h4>}

      <form onSubmit={handleSubmit}>
        <input required type="text" name="fullName" placeholder='FullName' />
        <input required type="text" name="body" placeholder='Add Comments' />
        <button type='submit'><svg fill="#000000" width="50px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492.013 492.013" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M119.8,62.761l-41.4-17.5l-10.3-4.4l-0.6-0.3l-0.3-0.1l-1.8-0.7l-1.4-0.4l-2.7-0.9c-3.2-0.8-7.7-1.7-10.9-1.8 c-6.5-0.3-13.1,0.8-19.1,3.1c-5.9,2.4-11.5,5.7-16,10.2c-9.3,8.5-14.9,21.1-15.3,34.2c0.1,6.5,1.1,13.1,3.6,18.8l0.9,2.2 c0.3,0.8,0.6,1.5,0.8,1.8l1.2,2.5l2.5,5l19.8,40.2c13.4,26.8,26.7,53.5,40,80.2l0.2,0.3c2.9,5.8,8.8,10,15.7,10.5 c47.3,3.4,94.4,6.4,141.5,9.1c47.2,2.7,86.8,1.3,84.1-8c-2.5-8.5-35.5-17.3-83.8-22.3c-43.1-4.3-86.4-8.7-129.8-13 c-16.3-34.4-32.8-68.9-49.7-103.1l-5.8-11.8l-2.9-5.9c-0.3-0.6-0.3-0.7-0.4-1l-0.3-0.7c-0.2-0.5-0.5-0.9-0.5-1.4 c-0.6-1.8-0.4-3.5-0.1-5.2c0.3-1.7,1.2-3.5,2.4-4.9c2.4-3.1,6.2-4.7,9.6-4.6c0.4,0,0.3,0.1,0.6,0c0.1,0,0.1-0.1,0.3-0.1l1.6,0.5 l1.6,0.5l0.8,0.3l0,0l2.6,1.1l12.2,5l97.8,39.8l195.7,79.2c28.6,13.5,57.3,26.7,86.2,39.7c0.4,0.2,1,0.4,1.2,0.6l0.6,0.4 c0.4,0.2,0.8,0.4,1.2,0.6c0.5,0.6,1.4,0.9,1.7,1.6c1.1,1.1,1.7,2.5,2.3,3.9c1,3,0.6,6.6-0.9,9.1c-0.5,1.3-1.9,2.3-2.6,3 c-0.1,0-0.1,0-0.1,0.1c0,0,0.1,0-0.1,0.1l-0.7,0.3l-1.3,0.6l-1.1,0.5l0,0l-0.3,0.1l-2.8,1.1l-22.2,8.8 c-59.2,23.5-118.2,47.8-177.3,72.4c-59,24.7-118.1,49.5-177.2,74.2l-11.1,4.6l-5.5,2.3c-0.9,0.3-0.8,0.2-1.3,0.4 c-0.3,0.1-0.7,0.4-1,0.3c-1.2,0.3-2.3,0.2-3.4,0c-1.1-0.4-2.2-0.8-3.3-1.6c-2.1-1.6-3.5-4.2-3.5-6.3c-0.2-0.5,0.1-1.2,0-1.6 c0.1,0,0,0.1-0.1,0.1h-0.1c0,0-0.1,0,0-0.3l0.6-1.4l0.6-1.4l0.2-0.6l1-2.1l2.7-5.4c14.2-28.6,28.5-57.2,42.7-85.8 c5.1-10.2,9.8-27.7,10.1-33.8c0.5-12.1-9.6-1-21.9,17c-10.2,14.9-20.4,30.7-30.7,47.4c-5.1,8.3-10.3,16.9-15.5,25.6 c-2.6,4.4-5.1,8.8-7.7,13.2l-3.9,6.7l-1.9,3.4l-1,1.7l-1.1,2.4l-0.8,1.8l-0.4,0.9l-0.4,1.4c-0.5,1.8-1.2,3.8-1.4,5.7 c-0.2,1.8-0.4,3.5-0.5,5.3c0.1,1.8,0.2,3.6,0.3,5.4c0.9,7.2,4,14,8.7,19.6c4.6,5.6,11,10,18.2,12.4c7.3,2.4,15.4,2.4,22.7,0.3 c4.1-1.2,6.2-2.1,8.8-3.1l7.6-2.9c5.1-2,10.2-3.9,15.3-5.9c10.2-4,20.4-8.1,30.6-12.1c98.3-39.4,196.6-78.9,295.1-118.4l36.9-15 l4.6-1.9l2.3-0.9l1.2-0.5l0.3-0.1l1.6-0.7l0.6-0.3l2.2-1.1l1.1-0.6c0.4-0.2,1.3-0.8,1.9-1.2c2.7-1.8,5.7-3.9,7.4-5.7 c8.1-7.7,13.3-18.4,14.2-29.3c1-10.8-1.5-22.2-8-31.4c-1.6-2.3-3.3-4.5-5.4-6.5c-1.9-2.1-4.1-3.8-6.4-5.3 c-2.2-1.7-4.7-2.8-7.1-4.1l-1.8-0.8l-1.1-0.5l-2.3-1l-36.8-15.4c-49.1-20.5-98.3-40.6-147.8-60.4c-24.2-10.5-48.4-20.9-72.6-31.4 L119.8,62.761z"></path> </g> </g> </g></svg></button>
      </form>
    </>
  )
}

function NotFound() {
  return (
    <p>Page not found. <a href="#/">return home</a></p>
  )
}

export default App

