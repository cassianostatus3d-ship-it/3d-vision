
// 3D VISION - SISTEMA DE AUTENTICAÇÃO

async function registerUser(name, email, phone, birthDate, password) {
  const birth = new Date(birthDate + "T00:00:00");
  const today = new Date();

  let age = today.getFullYear() - birth.getFullYear();

  if (
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
     today.getDate() < birth.getDate())
  ) age--;

  if (age < 15) {
    throw new Error("Registo proibido para menores de 15 anos.");
  }

  if (password.length < 10) {
    throw new Error("A palavra-passe deve ter pelo menos 10 caracteres.");
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
        birth_date: birthDate
      }
    }
  });

  if (error) throw error;

  return data;
}

async function loginUser(email, password) {
  const { data, error } =
    await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

  if (error) throw error;

  return data;
}

async function logoutUser() {
  const { error } = await supabaseClient.auth.signOut();
  if (error) throw error;

  location.href = "index.html";
}

async function getCurrentUser() {
  const { data, error } =
    await supabaseClient.auth.getUser();

  if (error) throw error;

  return data.user;
}

async function getCurrentProfile() {
  const user = await getCurrentUser();

  if (!user) return null;

  const { data, error } = await supabaseClient
    .from("profiles")
    .select("id,name,email,phone,birth_date,role")
    .eq("id", user.id)
    .single();

  if (error) throw error;

  return data;
}
