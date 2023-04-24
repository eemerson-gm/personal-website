import { useQuery } from '@tanstack/react-query';
import qs from 'query-string';
import ApiClient from './components/ApiClient';
import Parser from 'html-react-parser';

export default function BlogPage() {
  const queryPage = qs.parse(window.location.search).page;
  const {
    data: response,
    status,
    isFetched,
  } = useQuery({
    queryKey: ['blog-page'],
    queryFn: async () => {
      return await ApiClient.get(`/pages/${queryPage}.html`);
    },
  });

  if (status !== 'success')
    return (
      <>
        <article>Oops this page as not found...</article>
      </>
    );

  return <>{Parser(response.data)}</>;
}
