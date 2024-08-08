export default function RevealImage({aiImageUrl}) {

    return (
      <div>
        {aiImageUrl && (
          <img src={aiImageUrl} alt="Generated" className="reveal-image"/>
        )}
      </div>
    );
  }