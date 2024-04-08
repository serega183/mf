export function onlyForAdmin() {
  const { data } = useAuth();
  if (data.value.user.role != "admin") {
    alert("Ты не админ! Доступ запрещён!");
    navigateTo({
      path: "/",
    });
  }
}
