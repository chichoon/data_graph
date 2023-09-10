export async function getData() {
  const res = await fetch('/mock_data.json');
  const data = await res.json();
  return data;
}
