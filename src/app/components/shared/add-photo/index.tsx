import { useRef } from "react"
import { MdPhotoCamera } from "react-icons/md"

type Props = {
  onAdd: (file: File) => void
  image: null | File
  // deleteFile: () => void
}

export default function AddPhoto({ onAdd, image }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const openFile = () => {
    fileRef.current!.click()
  }

  const addFiles = (event: EventTarget & HTMLInputElement) => {
    if (!event.files?.length) return
    const file = event.files[0]
    onAdd(file)
  }

  return (
    <div
      className={`flex items-center justify-center flex-col gap-3 size-[150px] rounded-full bg-default-100 dark:bg-zinc-800 mx-auto cursor-pointer`}
      onClick={() => {
        openFile()
      }}
    >
      {!image ? (
        <>
          <MdPhotoCamera size={30} />
          <span className="text-foreground">Add photo</span>
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            className="hidden"
            onChange={e => addFiles(e.target)}
          />
        </>
      ) : (
        <>
          <img
            src={URL.createObjectURL(image)}
            alt="avatar"
            className="rounded-full object-cover w-full h-full"
          />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={fileRef}
            onChange={e => addFiles(e.target)}
          />
        </>
      )}
    </div>
  )
}
