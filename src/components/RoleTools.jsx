export default function RoleTools({ tools }) {
  if (!tools?.length) return null;

  return (
    <aside className="role-tools" aria-label="Tools used in this role">
      <ul>
        {tools.map(({ name }) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </aside>
  );
}
