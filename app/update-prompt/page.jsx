'use client';

import Form from '@components/Form';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: ''
  });

  useEffect(() => {
    const fetchPrompt = async () => {
      const response = await (await fetch(`/api/prompt/${id}`)).json();
      setPost(response);
    };

    fetchPrompt().then();
  }, []);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ ...post })
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    ></Form>
  );
};

export default EditPrompt;
