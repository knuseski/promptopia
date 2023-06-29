'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user.id) {
      fetchPosts().then();
    } else {
      router.push('/');
    }
  }, [session]);

  const fetchPosts = async () => {
    const response = await (await fetch(`/api/users/${session?.user.id}/posts`)).json();
    setPosts(response);
  };

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const confirmed = confirm('Are you sure you want to delete this prompt?');
    if (confirmed) {
      const response = await fetch(`/api/prompt/${post._id}`, { method: 'DELETE' });

      if (response.ok) {
        fetchPosts().then();
      }
    }
  };

  useEffect(() => {}, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalzied profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
