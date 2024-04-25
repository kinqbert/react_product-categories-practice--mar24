import cn from 'classnames';

export const UsersFilter = ({
  usersFromServer,
  selectedUserId,
  setSelectedUserId,
}) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      data-cy="FilterUser"
      href="#/"
      onClick={() => setSelectedUserId(0)}
      className={cn({
        'is-active': selectedUserId === 0,
      })}
    >
      All
    </a>

    {usersFromServer.map(user => (
      <a
        data-cy="FilterAllUsers"
        href="#/"
        onClick={() => setSelectedUserId(user.id)}
        key={user.id}
        className={cn({
          'is-active': selectedUserId === user.id,
        })}
      >
        {user.name}
      </a>
    ))}
  </p>
);
