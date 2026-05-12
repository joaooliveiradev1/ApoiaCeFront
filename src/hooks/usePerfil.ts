import { useState, useEffect, useCallback } from "react";
import { perfilService } from "../services/perfilService";
import { usuarioService } from "../services/usuarioService";
import type {
  PerfilUsuarioResponse,
  PerfilUsuarioRequest,
} from "../types/perfil";
import type { UsuarioResponse, UsuarioUpdateRequest } from "../types/usuario";
import { useAuth } from "./useAuth";

interface UsePerfilReturn {
  usuario: UsuarioResponse | null;
  perfil: PerfilUsuarioResponse | null;
  loading: boolean;
  erro: string | null;
  atualizarUsuario: (data: UsuarioUpdateRequest) => Promise<void>;
  salvarPerfil: (data: PerfilUsuarioRequest) => Promise<void>;
}

export function usePerfil(): UsePerfilReturn {
  const { usuario: usuarioAuth } = useAuth();

  const [usuario, setUsuario] = useState<UsuarioResponse | null>(null);
  const [perfil, setPerfil] = useState<PerfilUsuarioResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!usuarioAuth?.id) return;
    carregarDados();
  }, [usuarioAuth?.id]);

  const carregarDados = useCallback(async () => {
    if (!usuarioAuth?.id) return;

    setLoading(true);
    setErro(null);

    try {
      const [dadosUsuario, dadosPerfil] = await Promise.allSettled([
        usuarioService.buscarPorId(String(usuarioAuth.id)),
        perfilService.buscar(),
      ]);

      if (dadosUsuario.status === "fulfilled") {
        setUsuario(dadosUsuario.value);
      }

      if (dadosPerfil.status === "fulfilled") {
        setPerfil(dadosPerfil.value);
      }
    } catch {
      setErro("Não foi possível carregar os dados do perfil.");
    } finally {
      setLoading(false);
    }
  }, [usuarioAuth?.id]);

  const atualizarUsuario = useCallback(
    async (data: UsuarioUpdateRequest) => {
      if (!usuarioAuth?.id) return;
      setErro(null);
      const atualizado = await usuarioService.atualizar(
        String(usuarioAuth.id),
        data,
      );
      setUsuario(atualizado);
    },
    [usuarioAuth?.id],
  );

  const salvarPerfil = useCallback(
    async (data: PerfilUsuarioRequest) => {
      setErro(null);
      const resultado = perfil
        ? await perfilService.atualizar(data)
        : await perfilService.criar(data);
      setPerfil(resultado);
    },
    [perfil],
  );

  return { usuario, perfil, loading, erro, atualizarUsuario, salvarPerfil };
}
