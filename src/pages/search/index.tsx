import { User } from "@components/shared/user"
import { Card, CardBody, Spinner } from "@nextui-org/react"
import { useLazyGetUsersByNicknameQuery } from "@services/userApi"
import debounce from "lodash.debounce"
import { useCallback, useEffect, useState } from "react"
import { RxCross2 } from "react-icons/rx"
import { Link } from "react-router-dom"

export const Search = () => {
  const [searchValue, setSearchValue] = useState("")
  const [getUsersByNickname, { data, isLoading, isError }] =
    useLazyGetUsersByNicknameQuery()

  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      if (value.trim()) {
        await getUsersByNickname(value)
      }
    }, 300),
    [],
  )

  // Вызываем debouncedSearch при изменении searchValue
  useEffect(() => {
    debouncedSearch(searchValue)

    return () => {
      debouncedSearch.cancel()
    }
  }, [searchValue, debouncedSearch])

  return (
    <div>
      <h1 className="text-2xl mb-5 ml-2">Поисковый запрос</h1>

      <div className="relative">
        <input
          className="w-full px-5 py-4 rounded-xl outline-none bg-content1 shadow-medium"
          placeholder="Введите поисковой запрос"
          type="text"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        {searchValue && (
          <button
            onClick={() => setSearchValue("")}
            className="absolute right-5 top-4 rounded-full disabled:opacity-50 disabled:hover:opacity-50 p-0 size-6 flex items-center justify-center bg-default"
            disabled={!searchValue}
          >
            {isLoading ? <Spinner /> : <RxCross2 size={12} />}
          </button>
        )}
      </div>

      <Card className="mt-10 min-h-[400px]">
        <CardBody>
          {!searchValue && !data?.length ? (
            <div className="p-5 opacity-50">Искать пользователей</div>
          ) : isLoading ? (
            <div className="w-full h-[300px] flex items-center justify-center">
              <Spinner />
            </div>
          ) : isError ? (
            <p className="p-5 opacity-50 text-red-500">
              Ошибка при загрузке данных
            </p>
          ) : data?.length === 0 ? (
            <p className="p-5 opacity-50">
              По запросу "{searchValue}" ничего не найдено
            </p>
          ) : (
            <div className="flex flex-col gap-5">
              {data?.map(user => (
                <Link key={user.id} to={`/user/${user.id}`}>
                  <Card>
                    <CardBody className="block">
                      <User
                        avatarUrl={user.avatarUrl ?? ""}
                        description={user.email ?? ""}
                        name={user.name ?? ""}
                      />
                    </CardBody>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  )
}
