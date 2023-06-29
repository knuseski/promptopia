import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const post = await Prompt.findById(params.id);
    if (!post) {
      return new Response(`Cannot find prompt with ID [${params.id}]`, { status: 404 });
    }
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all prompts.', { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();
    const exist = await Prompt.findById(params.id);

    if (!exist) {
      return new Response(`Cannot find prompt with ID [${params.id}]`, { status: 404 });
    }

    const updated = await Prompt.updateOne({ id: exist.id }, { prompt, tag });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    return new Response(`Failed to update prompt with ID [${params.id}].`, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response('Prompts deleted successfully.', { status: 200 });
  } catch (error) {
    return new Response(`Failed to delete prompt with ID [${params.id}]. ${error}`, {
      status: 500
    });
  }
};
