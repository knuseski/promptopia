'use client';

import { useEffect, useState } from 'react';
import PromptCard from '@components/PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((item) => (
        <PromptCard key={item._id} post={item} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(false);

  const handleSearchChange = (e) => {
    const searchedValue = e.target.value.toLowerCase();
    setSearchText(searchedValue);
    if (!searchTimeout) {
      setSearchTimeout(true);
      setTimeout(() => {
        if (searchedValue) {
          const filteredData = allPosts.filter(
            (post) =>
              post.creator.username.toLowerCase().includes(searchedValue) ||
              post.prompt.toLowerCase().includes(searchedValue) ||
              post.tag.toLowerCase().includes(searchedValue)
          );
          setPosts(filteredData);
        } else {
          setPosts(allPosts);
        }
        setSearchTimeout(false);
      }, 500);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await (await fetch('/api/prompt')).json();
      setPosts(response);
      setAllPosts(response);
    };

    fetchPosts().then();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
